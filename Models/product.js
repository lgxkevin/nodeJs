const products = []

module.exports = class Product {
    constructor(title) {
        this.title = title
    }

    save() {
        // this will refer to the object created based on the class 
        products.push(this)
    }
    // static: call this method directly on the class itself and not on an instantiated object
    static fetchAll() {
        return products;
    }
}