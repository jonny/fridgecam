var server = require('./server');
var router = require('./router');
var handlers = require('./requestHandlers');

router.addRoute('/', handlers.displayRoot);
router.addRoute('/img/.*', handlers.displayImg);

server.start(router.routeRequest);