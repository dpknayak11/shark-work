exports.get404 = async(req, res, next) => {
    console.log("error404");
    res.status(404).send('err404');
}