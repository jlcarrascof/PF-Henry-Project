const {MongoClient} = require("mongodb");

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect("mongodb+srv://quevedodiego3008:holamundo@cluster0.rlks4ix.mongodb.net/?retryWrites=true&w=majority")
        //MongoClient.connect("mongodb+srv://quevedodiego3008:holamundo@cluster0.rlks4ix.mongodb.net/")
        .then((client) => {
            dbConnection = client.db("Rentify")
            return cb()
        })
        .catch(error => {
            console.log(error)
            return cb(error)
        })
    },
    getDb: () => dbConnection
}