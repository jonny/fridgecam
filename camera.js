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

camera.on('read', function( err, timestamp, filename ){
	console.log('Image captured with filename: ' + filename );
});

camera.on('exit', function( timestamp ){
	lastTimeStamp = timestamp;
	console.log('Camera has exited at timestamp: ' + lastTimeStamp );
});


function start() {
	console.log('Starting camera');
	console.log('t1:'+ lastTimeStamp);
	camera.start();
	console.log('t2:'+ lastTimeStamp);
}

function getLastTimestamp() {
	return lastTimeStamp ? 
		new Date(lastTimeStamp).toLocaleString() :
			'never';
}

exports.start = start;
exports.getLastTimestamp = getLastTimestamp;
