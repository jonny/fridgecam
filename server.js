var fs = require('fs');
var http = require('http');
var url = require('url');
var camera = require('./camera');

var PORT = 8080;
var IMG_DIR = '/img';

function start() {
	function onRequest(request, response) {
	    var parsedUrl = url.parse(request.url);
		var pathname = parsedUrl.pathname;
	 
	    switch(pathname) {
		    case '/':
				displayRoot(parsedUrl, request, response);
				break;
		    case IMG_DIR + pathname.slice(IMG_DIR.length):
		    	displayImg(pathname.slice(IMG_DIR.length), response)
				console.log('display img');
				break;
		    default:
				display404(parsedUrl, request, response);
	    }
	    return;
	}

	function displayRoot(parsedUrl, request, response) {
		console.log('Displaying root.');
		camera.start();
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('<html><head></head><body><h1>Latest Picture</h1>');
		response.write('<div><img src=\'.'+ IMG_DIR +'/latest-pic.jpg\'></div>');
		response.write('Taken at: '+ camera.getLastTimestamp());
		response.write('</body></html>');
		response.end();
	}

	function displayImg(imgName, response) {
		console.log('Displaying image '+ imgName);
	    // var img = fs.readFileSync('.'+ IMG_DIR + imgName);
	    response.writeHead(200, {'Content-Type': 'image/jpeg' });
	    // response.end(img, 'binary');

	    var filePath = '.'+ IMG_DIR + imgName;
	    fs.createReadStream(filePath, 'utf-8').pipe(response);
	 }

    function display404(parsedUrl, request, response) {
		response.writeHead(404, {'Content-Type': 'text/html'});
		response.write('<h1>404 Not Found</h1>');
		response.end('The page you were looking for: '+url+' can not be found');
    }

	http.createServer(onRequest).listen(PORT);
	console.log('Server has started.');
}

exports.start = start;