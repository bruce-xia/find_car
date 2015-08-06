
/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Node.js\n');
}).listen(8124, "10.124.94.33");
console.log('Server running at http://10.124.94.33:8124/');
*/

//=========================
  var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

  MongoClient.connect('mongodb://localhost:27017/parking', function(err, db) {
    if(err) throw err;

    var collection = db.collection('location');

    collection.insert([
	{qr_id:1, x:164, y:106, "map_path":"/home/project/parking/map/map_001.jpg"},
	{qr_id:2, x:160, y:306, "map_path":"/home/project/parking/map/map_001.jpg"},
	{qr_id:3, x:160, y:515, "map_path":"/home/project/parking/map/map_001.jpg"},
	{qr_id:4, x:164, y:727, "map_path":"/home/project/parking/map/map_001.jpg"},
	{qr_id:5, x:163, y:933, "map_path":"/home/project/parking/map/map_001.jpg"},
	{qr_id:6,x:165,y:1131,"map_path":"/home/project/parking/map/map_001.jpg"}],
	function(err, docs) {
      collection.count(function(err, count) {
        console.log(format("count = %s", count));
      });

      // Locate all the entries using find
      collection.find().toArray(function(err, result) {
        console.dir(result);
        // Let's close the db
//        db.close();
      });
    });
//    var collection = db.collection('map');
//    collection.insert({map_id:1, "file_path":"/home/project/map/map_001.jpg"},function(err, docs){
//	collection.count(function(err, count){
//		console.log(format("count = %s", count));
//	});
       
//    });
   
//    collection.find().toArray(function(err, results) {
//	console.dir(results);
	
        // Let's close the db
        //db.close();

//    });

    var collection = db.collection('usr');   

    collection.find().toArray(function(err, result){
        console.dir(result);
        //Let's close the db
        db.close();
    });
  })



