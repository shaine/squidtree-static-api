const createSelector = require('reselect').createSelector;
const Express = require('express');
const http = require('http');
const pkg = require('./package');
const bunyan = require('bunyan');

const __DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
const log = bunyan.createLogger({
    name: pkg.name
});

let db;
try {
    db = __DEVELOPMENT__ ? require('./testDb.json') : require('./db.json');
} catch (e) {
    throw('DB not found! Is it installed?');
}

const app = new Express();
const server = new http.Server(app);

app.use(function logger(req, res, next) {
    function afterResponse() {
        res.removeListener('finish', afterResponse);
        res.removeListener('close', afterResponse);

        log.info(`${res.statusCode} ${req.method} ${req.url}`);
    }

    res.on('finish', afterResponse);
    res.on('close', afterResponse);

    next();
});

app.use('/', function index(req, res, next) {
});

app.use('/search', function search(req, res, next) {
});

app.use('/posts', function posts(req, res, next) {
});

app.use('/post/:postId', function post(req, res, next) {
});

app.use('/users', function users(req, res, next) {
});

app.use('/user/:userId', function user(req, res, next) {
});

app.use('/links', function links(req, res, next) {
});

app.use('/link/:linkId', function link(req, res, next) {
});

app.use(function handle404(req, res) {
    res.status(404).send('Not found');
});

app.use(function handleException(err, req, res, next) {
    log.error(err.stack)
    res.status(500).send('Internal exception');
});

server.listen(pkg.port, err => {
    log.info(`==> ✅  App is running on port ${pkg.port}.`);
});
