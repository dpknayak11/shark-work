// This code imports the modules (files) fs and path from the node js
const fs = require('fs');
const path = require('path');

//This code states the 'pathBuilt' is the join og 'path.dirname'( which requires the main file) and 'data','products.json'
const pathBuilt = path.join(path.dirname(require.main.filename),'data','products.json');

// This code is the 'getProductFromFile' which takes an argument of 'callbackFn'. If 'err' is found, it will return an empty array, else will 'callbackFn' the 'JSON.parse(fileContent)'
const getProductsFromFile = (callbackFn) => {
    fs.readFile(pathBuilt, (err, fileContent) => {
        if (err) { return callbackFn([]); }
        callbackFn(JSON.parse(fileContent));
    })
}

//This code 'export' the entire 'Product' class
module.exports = class Product {

// This part of the code states what the 'constructer' will when the class is called.
// It will take one item into consideretion which is 'incomingTitle' 
    constructor(incomingTitle) {
        this.title = incomingTitle;
    }

// This part of the code is the 'save' function which calls the 'getProductFormFile' from above and
// pushes the 'this' keyword into the function. 
    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(pathBuilt, JSON.stringify(products), (err) => {
                console.log('err', err);
            });
        })
    }

// This code is the 'static fetchAll' which takes in the argument, 'callbackFn'. It calls the
// 'getProductFormFile' function from above
    static fetchAll(callbackFn) {
        getProductsFromFile(callbackFn);
    }
}



// variable uses
// const productData = []
// module.exports = class Product {
//     constructor(name) {
//         this.title = name;
//     }

//     save() {
//         productData.push(this);
//     }

//     static fetchAll() {
//         return productData;
//     }
// }