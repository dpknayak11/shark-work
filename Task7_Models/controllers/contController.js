
const Contactus = require('../models/contactus')

//getAddContactus is a function to render contactus page
exports.getAddContactus = (req, res, next) => {
    console.log(" contactus GET........")  //print the log on console for the request
    res.render('contactus', {  //to render contact us page
        pageTitle: 'Contactus',  //page title passed 
        path: '/contactus'  //path passed
    });
}

// postAddContactus is a function to store the user input details
exports.postAddContactus = (req, res, next) => {
    console.log(req.body);  //print the log on console with user body
    console.log(req.body.title);  //print the log on console with user title
    const contactus = new Contactus(req.body.title);
    contactus.save()
    console.log("contactus POST............");  //print the log on console for the request
    res.redirect('/showContactus'); //redirect to the showContactus page
}

// getContactus is a function to fetch the user details from array
exports.getContactus = (req, res, next) => {
    console.log("showContactus GET.........."); //print the log on console for the request
    console.log(Contactus); //print the log on console with user details
    Contactus.fetchAll((contactus) => {
        res.render('contactusData', { //to render contact us data page
            prods: contactus, //user details are passed
            pageTitle: 'showContactus', //page title passed
            path: '/showContactus' //path passed
        });
    })
}