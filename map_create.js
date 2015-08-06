var MongoClient = require('mongodb').MongoClient,
    format = require('util').format;

MongoClient.connect('mongodb://localhost:27017/parking', function(err, db) {
    if (err) throw err;

    var collection = db.collection('map');
    collection.insert({
        map_id: 1,
        "file_path": "/root/dev/nodejs/mongodb/map_001.jpg"
    }, function(err, docs) {
        collection.count(function(err, count) {
            console.log(format("count = %s", count));
        });

    });

    collection.find().toArray(function(err, results) {
        console.dir(results);
        db.close();

    });

})
