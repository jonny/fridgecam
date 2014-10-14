var fs = require('fs');
var camera = require('./camera');

var IMG_DIR = '/img';


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

function displayImg(parsedUrl, request, response) {
	var imgName = parsedUrl.pathname.slice(IMG_DIR.length);
    var filePath = '.'+ IMG_DIR + imgName;

	console.log('Displaying image '+ imgName);
    response.writeHead(200, {'Content-Type': 'image/jpeg' });
    fs.createReadStream(filePath, 'utf-8').pipe(response);
 }

 exports.displayRoot = displayRoot;
 exports.displayImg = displayImg
