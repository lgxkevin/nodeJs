// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db.collection('users').insertOne(this);
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map(i => i.productId);
//     return db.collection('products')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then(products => {
//         // if we deleted a product => we remove it from cart
//         if (this.cart.items.length !== products.length) {
//           console.log(`DELETING PRODUCTS DETECTED, WILL REMOVE THEM FROM CART`);

//           // get only existing products
//           const upToDateCartWithProducts = this.cart.items.filter(item => {
//             const existingProduct = products.find(pr => pr._id.toString() === item.productId.toString());
//             return existingProduct && existingProduct._id;
//           });
//           // async operation
//           db.collection('users')
//             .updateOne(
//               { _id: new ObjectId(this._id) },
//               { $set: { cart: { items: upToDateCartWithProducts } } }
//             );
//         }
//         return products.map(pr => {
//           pr.quantity = this.cart.items.find(item => item.productId.toString() === pr._id.toString()).quantity;
//           return pr;
//         })
//       })
//   }

//   getOrders() {
//     const db = getDb();
//     return db.collection('orders').find({ 'user._id': new ObjectId(this._id) }).toArray();
//   }


//   static findById(id) {
//     const db = getDb();
//     return db.collection('users').findOne({ _id: new ObjectId(id) });
//   }
// }

// module.exports = User;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({ productId: product._id, quantity: newQuantity })
  }
  const updatedCart = { items: updatedCartItems };
  this.cart = updatedCart;
  return this.save()
}

userSchema.methods.deleteItemFromCart = function(productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
}

userSchema.methods.clearCart = function(){
  this.cart = {items: []};
  return this.save();
}
module.exports = mongoose.model('User', userSchema);