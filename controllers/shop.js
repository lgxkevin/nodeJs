const Product = require('../Models/product')

exports.getProducts = (req, res, next) => {
    // res.send('<h1>Hello from express</h1>');
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir,'views', 'shop.html'));

    Product.fetchAll(products => {
    // use the default template engine (defined in app.js) and return that template
    // render function allow us to pass data that should be added in to view
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'ALl products',
            path: '/products',
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path:'/cart',
        pageTitle:'Shopping cart',
    })
}

exports.getCheckOut = (req, res, next) => {
    res.render('shop/checkout', {
        path:'/checkout',
        pageTitle:'checkout page',
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path:'/orders',
        pageTitle:'Orders page',
    })

}