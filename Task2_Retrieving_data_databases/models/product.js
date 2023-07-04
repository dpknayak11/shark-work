const db = require('../utils/database')
const Cart = require('./cart')

//This code 'export' the entire 'Product' class
module.exports = class Product {

// This part of the code states what the 'constructer' will when the class is called.
// It will take one item into consideretion which is 'incomingTitle' 
    constructor(id, title, description, price, imageUrl) {
        this.id= id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }
    save(){
        return db.execute(
            'INSERT INTO products (title, description, price, imageUrl) VALUE (?, ?, ?, ?)',
            [this.title,this.description, this.price, this.imageUrl]
        );
     }
    saveModifedProduct(){  }
    static fetchAll(){ 
       return db.execute('SELECT * FROM products') 
     }
    static findProductById(id){
       return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }
    static remove(){  }
}
