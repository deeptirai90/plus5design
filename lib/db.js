const MongoClient = require('mongodb').MongoClient;
const mongodbUri = "mongodb+srv://plus5design:<plus5.90>@plus5design-sb2cs.mongodb.net/test?retryWrites=true&w=majority";

let _db;

/*
const MongoClient = require(‘mongodb’).MongoClient;
const uri = "mongodb+srv://plus5design:<password>@plus5design-sb2cs.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/


function initDb(dbUrl, callback){ // eslint-disable-line
    if(_db){
        console.warn('Trying to init DB again!');
        return callback(null, _db);
    }
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, connected);
    function connected(err, client){
        if(err){
            return callback(err);
        }

        // select DB
        const dbUriObj = mongodbUri.parse(dbUrl);
        let db;
        // if in testing, set the testing DB
        if(process.env.NODE_ENV === 'test'){
            db = client.db('testingdb');
        }else{
            db = client.db(dbUriObj.database);
        }

        // setup the collections
        db.users = db.collection('users');
        db.products = db.collection('products');
        db.orders = db.collection('orders');
        db.pages = db.collection('pages');
        db.menu = db.collection('menu');
        db.customers = db.collection('customers');
        db.cart = db.collection('cart');
        db.sessions = db.collection('sessions');

        _db = db;
        return callback(null, _db);
    }
};

function getDb(){
    return _db;
}

module.exports = {
    getDb,
    initDb
};
