var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var objectID = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/parking';


var removeLoc = function(db, callback) {
    db.collection('location').remove(function(err, results) {
        console.log(results);
        callback();
    });
};

MongoClient.connect(url, function(err, db) {

    assert.equal(null, err);

    removeLoc(db, function() {

        db.close();

    });


});


var removeMap = function(db, callback) {
    db.collection('map').remove(function(err, results) {
        console.log(results);
        callback();
    });
};

MongoClient.connect(url, function(err, db) {

    assert.equal(null, err);

    removeMap(db, function() {

        db.close();

    });


});


var removeUsr = function(db, callback) {
    db.collection('usrMgr').remove(function(err, results) {
        console.log(results);
        callback();
    });
};

MongoClient.connect(url, function(err, db) {

    assert.equal(null, err);

    removeUsr(db, function() {

        db.close();

    });


});
