const fs = require('fs');
const path = require('path');

const products = []

module.exports = class Product {
    constructor(title) {
        this.title = title
    }

    save() {
        // this will refer to the object created based on the class 
        //products.push(this)

        const p = path.join(path.dirname(process.mainModule.filename),
        'data',
        'products.json'
        );
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        })
    }
    // static: call this method directly on the class itself and not on an instantiated object
    static fetchAll(cb) {
        const p = path.join(path.dirname(process.mainModule.filename),
        'data',
        'products.json'
        );
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });
    }
}