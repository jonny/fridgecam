var server = require('./server');
var router = require('./router');
var handlers = require('./requestHandlers');

router.addRoute('/', handlers.displayRoot);
router.addRoute('/snap', handlers.takePhoto);
router.addRoute('/img/.*', handlers.displayImg);
router.addRoute('/static/.*', handlers.displayStaticFile);

server.start(router.routeRequest);