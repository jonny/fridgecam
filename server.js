var http = require('http');

var PORT = 8080;

function start(routeRequest) {
	function onRequest(request, response) {
		routeRequest(request, response);
	    return;
	}

	http.createServer(onRequest).listen(PORT);
	console.log('Server has started.');
}

exports.start = start;