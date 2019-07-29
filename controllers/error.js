exports.get404 = (req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname,'views','404.html'));

    res.status(404).render('404', { 
        pageTitle: '404 Not Found', 
        path: '/404',
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.get500 = (req, res, next) => {
    res.status(500).render('500', { 
        pageTitle: 'Server Error', 
        path: '/500',
        isAuthenticated: req.session.isLoggedIn
    })

}