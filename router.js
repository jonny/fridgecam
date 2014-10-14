url = require('url');

var routes = [];

function routeRequest(request, response) {
    var parsedUrl = url.parse(request.url);
	var pathname = parsedUrl.pathname;

	for (i = 0; i < routes.length ; i++) {
		var route = routes[i];
		if (route.pattern.test(pathname)) {
			console.log('Routing request to handler for: '+ route.handler.name);
			route.handler(parsedUrl, request, response);
			return;
		}
	}
	display404(parsedUrl, request, response);
}

function addRoute(pattern, handler) {
	if (typeof pattern === 'string') {
	  pattern = new RegExp("^" + pattern + "$");
	}
	var route = {
	  pattern: pattern,
	  handler: handler
	};
	routes.push(route);
}


function display404(parsedUrl, request, response) {
	response.writeHead(404, {'Content-Type': 'text/html'});
	response.write('<h1>404 Not Found</h1>');
	response.end('The page you were looking for: '+parsedUrl.pathname+' can not be found');
}


exports.routeRequest = routeRequest;
exports.addRoute = addRoute;