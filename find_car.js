var http = require('http'),
    express = require('express'),
    path = require('path'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

var url = require('url');
var app = express();
app.set('port', process.env.PORT || 9000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.bodyParser()); // <-- add

app.use(express.static(__dirname + '/images'));



var mongoHost = 'localHost';
var mongoPort = 27017;
var fileDriver; //<--
var collectionDriver;

usr = 0;
phone = 0;

var mongoClient = new MongoClient(new Server(mongoHost, mongoPort));
mongoClient.open(function(err, mongoClient) {
    if (!mongoClient) {
        console.error("Error! Exiting... Must start MongoDB first");
        process.exit(1);
    }
});

var db = mongoClient.db("parking");

var insertUsr = function(usrID, qrID, callback) {

    var usr_collection = db.collection('usr');

    usr_collection.insert({
        usr_id: usrID,
        qr_id: qrID,
        p_flag: 1,
        start: 8888,
        end: 8888,
        card_id: 8888
    }, function(err, docs) {
        usr_collection.count(function(err, count) {
            console.log("insert user count = " + count);
        });
    });

    usr_collection.find().toArray(function(err, docs) {

        console.dir(docs);

        //callback(docs);

        //db.close();

    });

};


var getLocbyqrID = function(qrID, callback) {

    var loc_collection = db.collection('location');


    loc_collection.find({
        qr_id: qrID
    }).toArray(function(err, result) {
        if (err) {

            console.log(err);

        } else if (result.length) {

            console.log('Loc Found:', result);

        } else {

            console.log('No doc(s) found with defined "loc find" criteria!');

        }

        //db.close();

        //callback(result);
    });

};


// todo, delete unused method
var isValidUsr = function(usrID, callback) {

    var usr_collection = db.collection('usr');

    var ret;


    usr_collection.count({
        usr_id: usrID
    }, function(err, count) {

        if (err) {

            console.log(err);

            ret = -1;

        } else if (count) {

            console.log('Usr Found:', count);

            ret = count;

        } else {

            console.log('No Usr found with defined "usr count" criteria!');

            ret = 0;

        }

        console.log(ret);
        return ret;

        //db.close();

        //callback(ret);

    });


};

var removeUsr = function(usrID, callback) {

    var usr_collection = db.collection('usr');

    usr_collection.remove({
        usr_id: usrID
    }, function(err, result) {

        //		assert.equal(err, null);

        //		assert.equal(1, result.result.n);

        console.log("Removed the doc with given usrID.");

        db.close();

        callback(result);
    })

};



var counter = 0;

app.use(express.static(path.join(__dirname, 'public')));

app.post('/', function(req, res) {
    /*
    	var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

    console.log("POST here"+req);
    console.log("req  is:"+req);
        console.log("req url is:"+req.url);
    console.log("para phone is:"+query.phone);
    */
    //res.sendfile(path.join(__dirname+'/two-position.htm'));
    //res.redirect(path.join(__dirname+'/two-position.htm'));
    //res.render(path.join(__dirname+'/two-position.htm'));
    //res.sendfile("two-position.htm");
    //res.json(200, {url: "http://3.cn"});

    var userPhone = req.body.userPhone;
    console.log("***** userPhone is :" + userPhone);


    var phone = userPhone;

    if (phone === undefined || phone == 0) {

        console.log("phone undefined or 0");
    } else {
        var usr_collection = db.collection('usr');

        counter = 0;

        console.log("enter search user method");
        usr_collection.count({
            usr_id: phone
        }, function(err, count) {

            if (err) {

                console.log("could not find the user:" + err);


            } else if (count) {
                // todo, found user then render the 2 positions on the map.

                console.log('Usr Found and count is :', count);
                //res.send('found user !!!');

                var html = '<!DOCTYPE html> <html>  <head>     <style>         body {             background-image: url("map.jpg");         }                  img {             position: absolute;             left: 0px;             top: 0px;             z-index: -1;         }              </style> </head>  <body onload="updatePosition()">       <img id="myPos1" src="car.gif" width="100" height="140" /> <img id="myPos2" src="man.gif" width="100" height="140" />       <script>         function updatePosition() {  			document.getElementById("myPos1").style.top = "300px";             document.getElementById("myPos1").style.left = "100px";              			document.getElementById("myPos2").style.top = "600px";             document.getElementById("myPos2").style.left = "500px";         }     </script> </body>  </html>';
                res.send(html);

            } else {
                // todo, not found user, then add the user with location information to DB.

                console.log('No Usr found with defined "usr count" criteria!');
                console.log("insert new user now");


                usr_collection.insert({
                    usr_id: phone,
                    qr_id: 100,
                    p_flag: 1,
                    start: 8888,
                    end: 8888,
                    card_id: 8888
                }, function(err, docs) {
                    usr_collection.count(function(err, count) {
                        console.log("insert user count = " + count);
                    });
                });

                usr_collection.find().toArray(function(err, docs) {

                    console.dir(docs);


                });


                var html = '<!DOCTYPE html> <html>  <head>     <style>         body {             background-image: url("map.jpg");         }                  img {             position: absolute;             left: 0px;             top: 0px;             z-index: -1;         }                  div.transbox {             position: absolute;             left: 320px;             top: 0px;             z-index: -1;         }     </style> </head>  <body onload="updatePosition()">       <img id="myPos1" src="car.gif" width="100" height="140" />        <script>         function updatePosition() {  			document.getElementById("myPos1").style.top = "300px";     document.getElementById("myPos1").style.left = "100px";        document.getElementById("myPos2").style.top = "200px";          }     </script> </body>  </html>';
                res.send(html);

                console.log("insert new user END");
            }

        });
    }



    console.log("POST finished");
});

app.get('/test', function(req, res) {

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    console.log("get here" + req);
    console.log("req  is:" + req);
    console.log("req url is:" + req.url);
    console.log("para phone is:" + query.phone);

    //res.sendfile(path.join(__dirname+'/two-position.htm'));
    //res.redirect(path.join(__dirname+'/two-position.htm'));
    //res.render(path.join(__dirname+'/two-position.htm'));
    res.sendfile("two-position.htm");
    console.log("get finished");



});


app.get('/', function(req, res) {

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    console.log("req url is:" + req.url);
    //console.log("dump the query now:");
    //console.log(query); //{Object}
    console.log("para usr is:" + query.usr); //{Object}
    console.log("para phone is:" + query.phone);

    if (query.phone > 0)
        phone = query.phone;

    if (query.usr > 0)
        usr = query.usr;


    if (counter == 0)
        counter = 1;
    else
        counter++;

    console.log("counter is :" + counter);


    // getLocbyqrID(1, null);
    //isValidUsr(120,console.log);

    console.log("usr is:" + usr);
    console.log("phone is:" + phone);

    var html = '<form action="/" method="post">' +
        'Enter your phone:' +
        '<input type="text" name="userPhone" placeholder="..." />' +
        '<br>' +
        '<button type="submit">Submit</button>' +
        '</form>';

    res.send(html);




});



app.use(function(req, res) {
    res.render('404', {
        url: req.url
    });
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});