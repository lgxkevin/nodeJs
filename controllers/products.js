const Product = require('../Models/product')

exports.getAddProducts = (req, res, next) => {
    // res.send('<html><form action="/product" method="POST"><input type="text" name="title">
    // <button type="submit">Add product</button><form></html>');
    // res.sendFile(path.join(rootDir,'views','add-product.html'))
    // res.render({name of view file}, variable passed to template)
    res.render('add-product', {
        pageTitle: 'addProduct',
        path: '/admin/add-product',
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};
exports.postAddProducts = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProduct = (req, res, next) => {
    // res.send('<h1>Hello from express</h1>');
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir,'views', 'shop.html'));

    Product.fetchAll(products => {
    // use the default template engine (defined in app.js) and return that template
    // render function allow us to pass data that should be added in to view
        res.render('shop', {
            prods: products,
            pageTitle: 'PugShop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
            // don't use the default layout
            // layout: false
        });
    });
};
