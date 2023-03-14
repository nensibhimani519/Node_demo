const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  // connect mongodb code
  MongoClient.connect(
    // username:-//fullStack
    // password:- fullStack@
    // database name:- /shopping?
    "mongodb+srv://fullStack:fullStack@cluster0.gng10gg.mongodb.net/shopping?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected !!");
      // data base name different form connect url [ not same name]
      _db = client.db("node_demo");
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No Database Found";
};

// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
