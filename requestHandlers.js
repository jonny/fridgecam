var fs = require('fs');
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
	response.write('<div><img src=\'.'+ IMG_DIR +'/latest-pic.jpg\' id="latestPic"></div>');
	response.write('<div id="takenAt">Taken at: '+ camera.getLastTimestamp() +'</div>');
	response.write('<div><a href="javascript:camera.takePhoto()">take another photo</a></div>');
	response.write('</body></html>');
	response.end();
}


function takePhoto(parsedUrl, request, response) {
	console.log('Taking photo.');
	camera.start(function(err, timestamp, filename) {
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.write('{');
		response.write('"timestamp": "'+ timestamp +'",');	
		response.write('"filename": "'+ filename +'",');
		response.write('}');
		response.end();
	});
	// displayRoot(parsedUrl, request, response);
}

function displayImg(parsedUrl, request, response) {
	var imgName = parsedUrl.pathname.slice(IMG_DIR.length);
    var filePath = '.'+ IMG_DIR + imgName;

	console.log('Displaying image '+ imgName);
    response.writeHead(200, {'Content-Type': 'image/jpeg' });
    fs.createReadStream(filePath, 'utf-8').pipe(response);
}

function displayStaticFile(parsedUrl, request, response) {
	var file = parsedUrl.pathname.slice(STATIC_DIR.length);
    var filePath = '.'+ STATIC_DIR + file;

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
    }

    fs.exists(filePath, function(fileExists) {
    	if (fileExists) {
			console.log('Displaying file '+ file +' of type '+ fileType);
		    response.writeHead(200, {'Content-Type': fileType });
		    fs.createReadStream(filePath, 'utf-8').pipe(response);
    	} else {
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
