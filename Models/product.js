const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });

}

module.exports = class Product {
    constructor(title) {
        this.title = title
    }

    save() {
        // this will refer to the object created based on the class 

        getProductFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }
    // static: call this method directly on the class itself and not on an instantiated object
    static fetchAll(cb) {
        getProductFromFile(cb)
    }
}