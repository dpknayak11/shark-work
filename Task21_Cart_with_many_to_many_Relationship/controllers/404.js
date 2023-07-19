exports.get404 = (req, res, next) => {
    console.log("ERROR: 404 Page-not-found");
    res.status(404).render('404', { pageTitle: 'Page not Found', path: ""} )
}