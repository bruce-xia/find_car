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

app.get('/test', function(req, res) {

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    console.log("req url is:" + req.url);
    console.log("para phone is:" + query.phone);

    res.sendfile(path.join(__dirname + '/two-position.htm'));

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

    if (counter == 1) {
        console.log("render login now");
        res.sendfile(path.join(__dirname + '/login.htm'));
        //res.sendfile("login.htm");
        return;
    } else {
        console.log("show another htm");
        //res.send('test !!!');
        res.sendfile("two-position.htm");
        counter = 0;
        return;

    }
    /*
    if (phone === undefined || phone == 0) {

    console.log("phone undefined or 0");
    }
    else {
    var usr_collection = db.collection('usr');

    counter = 0;

    console.log("enter search user method");
            usr_collection.count({
                usr_id: phone
            }, function(err, count) {

                if (err) {

                    console.log("could not find the user:"+err);


                } else if (count) {
    // todo, found user then render the 2 positions on the map.

                    console.log('Usr Found and count is :', count);
    //res.send('found user !!!');
    res.sendfile("two-position.htm");


                } else {
    // todo, not found user, then add the user with location information to DB.

                    console.log('No Usr found with defined "usr count" criteria!');
    console.log("insert new user now");
    res.send('insert user !!!');

    //res.sendfile("one-position.htm");
    console.log("insert new user END");
                }

    });


    }
    */


});



app.use(function(req, res) {
    res.render('404', {
        url: req.url
    });
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});