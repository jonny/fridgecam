var RaspiCam = require('raspicam');

var lastTimeStamp;

var camera = new RaspiCam({ 
	mode: 'photo',
	output: './img/latest-pic.jpg',
	timeout: 10
});


camera.on('started', function( err, timestamp ){
	console.log('Camera started at ' + timestamp );
});

// camera.on('read', function( err, timestamp, filename ){
// 	console.log('Image captured with filename: ' + filename );
// });

camera.on('exit', function( timestamp ){
	lastTimeStamp = timestamp;
	console.log('Camera has exited at timestamp: ' + lastTimeStamp );
});


function start(success) {
	console.log('Starting camera');
	camera.on('read', success);
	camera.start();
}

function getLastTimestamp() {
	return lastTimeStamp ? 
		new Date(lastTimeStamp).toLocaleString() :
			'never';
}

exports.start = start;
exports.getLastTimestamp = getLastTimestamp;
