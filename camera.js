var RaspiCam = require('raspicam');

var lastTimeStamp = 'never';

var camera = new RaspiCam({ 
	mode: 'photo',
	output: './img/latest-pic.jpg'
});


camera.on('started', function( err, timestamp ){
	console.log('Camera started at ' + timestamp );
});

camera.on('read', function( err, timestamp, filename ){
	console.log('Image captured with filename: ' + filename );
});

camera.on('exit', function( timestamp ){
	lastTimeStamp = timestamp;
	console.log('Camera has exited at timestamp: ' + lastTimeStamp );
});


function start() {
	console.log('Starting camera');
	camera.start();
}

function getLastTimestamp() {
	return new Date(lastTimeStamp).toLocaleString();
}

exports.start = start;
exports.getLastTimestamp = getLastTimestamp;
