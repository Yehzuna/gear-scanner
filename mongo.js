const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost/gear-scanner", (error, db) => {
    if (error) throw error;

    //db.collection('realms').drop();

    db.collection('realms').find().toArray((err, docs) => {
        if (err) throw err;
        console.log(docs);


    });

    db.close();
});

