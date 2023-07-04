const path = require('path');
const fs = require('fs');

const pathBuilt = path.join(path.dirname(require.main.filename),'data','cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice){
        //Fetch the previous cart
        fs.readFile(pathBuilt, (err, fileContent)=>{
            let cart = {products: [], totalPrice: 0} ;
            if(!err){
                cart = JSON.parse(fileContent);
            }
            // analyze the cart => Find existing product
            const existingProductIndex = cart.products.find(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct;
            // add new product increase quantity
            if(existingProduct){
                updatedProduct = { ...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [ ...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else{
                updatedProduct = { id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(pathBuilt, JSON.stringify(cart), err =>{
                console.log(err);
            });
        });
    }
    // static deleteProduct(id, productPrice){
    //     fs.readFile(pathBuilt, (err, fileContent)=>{
    //         if (err) { return; }
    //         const updatedCart = {...JSON.parse(fileContent)};
    //         const product = updatedCart.products.find(prod => prod.id === id);
    //         const productQty = product.qty;
    //         updatedCart.products = updatedCart.products.filter( prod => prod.id !== id );
    //         updatedCart.totalPrice = cart.totalPrice - productPrice * productQty;

    //         fs.writeFile(pathBuilt, JSON.stringify(updatedCart), err =>{
    //             console.log(err);
    //         });
    //     })
        
    // }
}