var express = require('express')
		, http = require('http')
		, url = require('url')
		, async = require('async')
		, request = require('request');
  // , passport = require('passport')
  // , mongodb = require('mongodb')
  // , mongoose = require('mongoose')
  // , bcrypt = require('bcrypt')
	// , User = require('./models/user')
	// , Portfolio = require('./models/portfolio')
  // , SALT_WORK_FACTOR = 10;
  
// mongoose.connect('localhost', 'fsnew');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback() {
//   console.log('Connected to DB');
// });

var nexmo = require('./lib/nexmo');

nexmo.initialize( process.env.NEXMO_KEY, process.env.NEXMO_SECRET, 'http', true);

var app = express();

// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.engine('ejs', require('ejs-locals'));
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: process.env.SECRET })); // CHANGE THIS SECRET!
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  // app.use(passport.initialize());
  // app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

client_id = 'd96c041239920faac684a72ac05d06bb';

app.get('/highlights', function( req, res ) {
	request('https://api.readmill.com/v2/highlights/search?client_id=' + client_id + '&query=' + req.query.term, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
			body = JSON.parse( body );
			
			items = body.items;
			highlights = [];
				
			async.each(
				items,
				function( highlight, cb ) {
					// hlt = highlight.highlight;
					
					// console.log( hlt );
					
					// highlights.push( hlt );
					
					// consol
					
					// cb();
					
					request('https://api.readmill.com/v2/readings/' + highlight.highlight.reading.id + '?client_id=' + client_id, function( err, resp, bd ) {
						bd = JSON.parse( bd );
						
						hlt = highlight.highlight;
						
						hlt.reading = bd.reading;
						
						highlights.push( hlt );
						
						cb();
					});
					
				},
				function() {
					res.send( highlights );
				}
			);
			
	    // res.send( books );
	  }
	});
});


app.get('/search', function( req, res ) {
	request('https://api.readmill.com/v2/books/search?client_id=' + client_id + '&query=' + req.query.term, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
			body = JSON.parse( body );
		
			books = [];
		
			// body.items.forEach( function( book ) {
			// 	book = book.book;
			// 	
			// 	books.push( book );
			// });
			// 
			// console.log( body.items );
						
			async.each(
				body.items,
				function( book, cb ) {
					book = book.book;
					
					request('https://api.readmill.com/v2/books/' + book.id + '/readings?client_id=' + client_id + '&count=100', function( err, resp, body ) {
						body = JSON.parse( body );
						book.readings = body.items;
						
						// s = "LOL";
						
						books.push( book );
						
						cb();
					});
				},
				function() {
					res.send( books );
				}
			);
			
	    // res.send( books );
	  }
	});
});

app.get('/sms', function( req, res ) {
	// nexmo.sendTextMessage('Landmarkr', '971501068203', req.query["message"], function( err, response ) {
	// 	console.log( response );
	// 	res.send( 'bob' );
	// });
	
	var from = 'Landmarkr';
	var to = req.query["to"].replace(/[^0-9]/g, '');
	var message = encodeURIComponent( req.query["message"] );
	
	var options = {
		host: 'rest.nexmo.com',
		port: '80',
		path: '/sms/json?api_key=' + process.env.NEXMO_KEY + '&api_secret=' + process.env.NEXMO_SECRET + '&from=' + from + '&to=' + to +'&text=' + message,
		method: 'POST'
	}
		
	http.get(options, function(response){
	  var str = '';
	
	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
	    str += chunk;
	  });
	
	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
	    res.send( str );
	  });
	}).on("error", function(e){
	  console.log("Got error: " + e.message);
	});
	
});

app.listen( process.env.PORT , function() {
  console.log('Express server listening on port ' + process.env.PORT);
});