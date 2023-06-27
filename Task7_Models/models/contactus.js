const fs = require('fs');
const path = require('path');

const pathBuilt = path.join(path.dirname(require.main.filename),'data','contactus.json');

const getContactusFromFile = (callbackFn) =>{
    fs.readFile(pathBuilt, (err, fileContent)=>{
        if(err) {return callbackFn([]);}
        callbackFn(JSON.parse(fileContent));
    })
}

module.exports = class Contactus {
    constructor(incomingTitle){
        this._title = incomingTitle;
    }
    save(){
        getContactusFromFile((contactus)=>{
            contactus.push(this);
            fs.writeFile(pathBuilt, JSON.stringify(contactus), (err) => {
                console.log('err', err);
            });
        })
       
    }
    static fetchAll(callbackFn){
        getContactusFromFile(callbackFn)
    }
}