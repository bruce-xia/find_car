
/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Node.js\n');
}).listen(8124, "10.124.94.33");
console.log('Server running at http://10.124.94.33:8124/');
*/

//=========================
/*  var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

  MongoClient.connect('mongodb://10.124.94.33:27017/test', function(err, db) {
    if(err) throw err;

    var collection = db.collection('location');
    collection.insert({"name":"aaa"}, function(err, docs) {

      collection.count(function(err, count) {
        console.log(format("count = %s", count));
      });

      // Locate all the entries using find
      collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
      });
    });
  })
*/
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var objectID = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/parking';

//var removeLoc = function(db, callback){
//	db.collection('location').deleteMany({map_id:1}, 
//        function(err, results){
//		console.log(results);
//		callback();
//	});
//};

//MongoClient.connect(url, function(err, db){
//	assert.equal(null, err);

//	removeLoc(db, function() {
//		db.close();
//	});


//var removeMap = function(db, callback){
//	db.collection('map').deleteMany({map_id:1}, 
//        function(err, results){
//		console.log(results);
//		callback();
//	});
//};

//MongoClient.connect(url, function(err, db){
//	assert.equal(null, err);

//	removeMap(db, function() {
//		db.close();
//	});


//});

var removeLoc = function(db,callback){
	db.collection('location').remove(function(err, results){
		console.log(results);
                callback();
	});
};

MongoClient.connect(url, function(err, db){

	assert.equal(null, err);

	removeLoc(db, function() {

		db.close();
		
	});


});


//var removeMap = function(db,callback){
//	db.collection('map').remove(function(err, results){
//		console.log(results);
//                callback();
//	});
//};

//MongoClient.connect(url, function(err, db){

//	assert.equal(null, err);

//	removeMap(db, function() {

//		db.close();
		
//	});


//});


var removeUsr = function(db,callback){
	db.collection('usr').remove(function(err, results){
		console.log(results);
                callback();
	});
};

MongoClient.connect(url, function(err, db){

	assert.equal(null, err);

	removeUsr(db, function() {

		db.close();
		
	});


});

