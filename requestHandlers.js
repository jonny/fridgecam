var fs = require('fs');
var path = require('path');
var camera = require('./camera');

var IMG_DIR = '/img';
var STATIC_DIR = '/static';


function displayRoot(parsedUrl, request, response) {
	console.log('Displaying root.');
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write('<html><head>');
	response.write('<script src="./static/script.js"></script>');
	response.write('<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>');
	response.write('</head>');
	response.write('<body><h1>Latest Picture</h1>');
	response.write('<div><img src="'+ IMG_DIR +'/latest-pic.jpg" id="latestPic"></div>');
	response.write('<div id="takenAt">Taken at: '+ camera.getLastTimestamp() +'</div>');
	response.write('<div><a href="javascript:camera.takePhoto()">take another photo</a></div>');
	response.write('</body></html>');
	response.end();
}


function takePhoto(parsedUrl, request, response) {
	console.log('Taking photo.');
	camera.start(function(timestamp) {
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.write('{');
		response.write('"timestamp": "'+ timestamp +'",');	
		response.write('"filename": ".'+ IMG_DIR +'/latest-pic.jpg"');
		response.write('}');
		response.end();
	});
}

function displayImg(parsedUrl, request, response) {
	displayFile(parsedUrl, request, response, IMG_DIR);
}

function displayStaticFile(parsedUrl, request, response) {
	displayFile(parsedUrl, request, response, STATIC_DIR);
}

function displayFile(parsedUrl, request, response, baseDir) {
	var file = parsedUrl.pathname.slice(baseDir.length);
    var filePath = path.dirname(require.main.filename) + baseDir + file;

    var suffix = 'txt';
    if (file.indexOf('.') > 0) {
    	suffix = file.split('\.').pop();
    }

    var fileType = 'text/plain';
    switch (suffix) {
    	case 'js':
    		fileType = 'text/javascript';
    		break;
    	case 'css':
    		fileType = 'text/css';
    		break;
    	case 'jpg':
    		fileType = 'image/jpeg';
    		break;
    }

    fs.exists(filePath, function(fileExists) {
    	if (fileExists) {
			console.log('Displaying file '+ file +' of type '+ fileType);
		    response.writeHead(200, {'Content-Type': fileType });
		    fs.createReadStream(filePath, 'utf-8').pipe(response);
    	} else {
			console.log('Couldn\'t find file: '+ filePath);
			response.writeHead(404, {'Content-Type': 'text/html'});
			response.write('<h1>404 Not Found</h1>');
			response.end('The page you were looking for: '+filePath+' can not be found');    		
    	}
    	
    })
}

exports.displayRoot = displayRoot;
exports.displayImg = displayImg
exports.displayStaticFile = displayStaticFile
exports.takePhoto = takePhoto
