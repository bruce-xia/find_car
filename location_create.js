var MongoClient = require('mongodb').MongoClient,
    format = require('util').format;

MongoClient.connect('mongodb://localhost:27017/parking', function(err, db) {
    if (err) throw err;

    var collection = db.collection('location');
    collection.insert(
        [{
            qr_id: 1,
            x: 164,
            y: 106,
            map_id: 1
        }, {
            qr_id: 2,
            x: 160,
            y: 306,
            map_id: 1
        }, {
            qr_id: 3,
            x: 160,
            y: 515,
            map_id: 1
        }, {
            qr_id: 4,
            x: 164,
            y: 727,
            map_id: 1
        }, {
            qr_id: 5,
            x: 163,
            y: 933,
            map_id: 1
        }, {
            qr_id: 6,
            x: 165,
            y: 1131,
            map_id: 1
        }],
        function(err, docs) {
            collection.count(function(err, count) {
                console.log(format("count = %s", count));
            });

            // Locate all the entries using find
            collection.find().toArray(function(err, results) {
                console.dir(results);
                db.close();
            });
        });

})


