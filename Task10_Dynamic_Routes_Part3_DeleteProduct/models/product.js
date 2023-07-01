// This code imports the modules (files) fs and path from the node js
const fs = require('fs');
const path = require('path');
const Cart = require('./cart')

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
    constructor(_productId, _title, _description, _price, _imageUrl) {
        this.productId = _productId;
        this.title = _title;
        this.description = _description;
        this.price = _price;
        this.imageUrl = _imageUrl;
    }

// This part of the code is the 'save' function which calls the 'getProductFormFile' from above and
// pushes the 'this' keyword into the function. 
    save() {
        this.productId = Math.round(Math.random() * 1000).toString();
        getProductsFromFile((products) => {
            products.push(this);

            fs.writeFile(pathBuilt, JSON.stringify(products), (err) => {
                console.log('err', err);
            });
        })
    }

// This code is the 'static fetchAll' which takes in the argument, 'callbackFn'. It calls the
// 'getProductFormFile' function from above
    saveModifedProduct(){
        if(this.productId){
            getProductsFromFile((products) => {
                const existingProdIndex = products.findIndex(
                    product => product.productId === this.productId
                );
                const modifiedProducts = [...products];
                modifiedProducts[existingProdIndex] = this;
    
                fs.writeFile(pathBuilt, JSON.stringify(modifiedProducts), (err) => {
                    console.log('err', err);
                });
            })
        }
    }
    static fetchAll(callbackFn) {
        getProductsFromFile(callbackFn);
    }
    static findProductById(pid, callbackFn){
        getProductsFromFile((products)=>{
            const product = products.find((product) => product.productId === pid );
            callbackFn(product)
        })
    }
    static remove(id){
        getProductsFromFile((products)=>{
            // const product = products.find(prod => prod.id === id);
            const updatedProduct = products.filter((prod) => prod.productId !== id);
            fs.writeFile(pathBuilt, JSON.stringify(updatedProduct), (err) => {
               if(err){
                console.log(err);
                return err;
               }
            });
        })        
    }
}
