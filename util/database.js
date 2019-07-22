const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongodbConnect = (callback) => {
    MongoClient.connect('mongodb+srv://kevinLiuRW:liuguanxi1995.@cluster0-ghwpk.azure.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser: true})
        .then(client => {
            _db = client.db();
            console.log('Mongodb Connected')
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const getDb = () => {
    if (_db) {
        return _db
    }
    throw 'No database found';
};

exports.mongoConnect = mongodbConnect;
exports.getDb = getDb;