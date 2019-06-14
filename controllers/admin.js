const Product = require('../Models/product')

exports.getAddProducts = (req, res, next) => {
    // res.send('<html><form action="/product" method="POST"><input type="text" name="title">
    // <button type="submit">Add product</button><form></html>');
    // res.sendFile(path.join(rootDir,'views','add-product.html'))
    // res.render({name of view file}, variable passed to template)
    res.render('admin/add-product', {
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

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products',
        });
    });

}