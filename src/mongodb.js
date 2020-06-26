//CRUD create read update delete

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //    name: 'Elad',
    //    age: 46 
    // }, (error, result)=>{
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }

    //     //ops is array of documents inserted
    //     console.log(result.ops);
    // });

    db.collection('users').insertMany([
        {
            name: 'Jen',
            age: 38

        }, {
            name: 'Gunther',
            age: 55
        }
    ], (error, result)=> {
        if (error) {
            return console.log('Unable to insert many rows');
        }

        console.log(result.ops);

    });
});

