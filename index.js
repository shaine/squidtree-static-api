const createSelector = require('reselect').createSelector;
const Express = require('express');
const http = require('http');
const pkg = require('./package');
const bunyan = require('bunyan');
const hal = require('express-hal');

const __DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
const log = bunyan.createLogger({
    name: pkg.name
});
const root = __DEVELOPMENT__ ?
    `http://localhost:${pkg.port}` :
    'https://bedlam.squidtree.com';

let db;
try {
    db = __DEVELOPMENT__ ? require('./testDb.json') : require('./db.json');
} catch (e) {
    throw('DB not found! Is it installed?');
}

const app = new Express();
const server = new http.Server(app);

app.use(hal.middleware);

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

app.get('/', function index(req, res, next) {
    res.hal({
        links: {
            self: `${root}/`
        }
    });
});

app.get('/search', function search(req, res, next) {
    res.hal({
        links: {
            self: `${root}/search`
        }
    });
});

app.get('/posts', function posts(req, res, next) {
    res.hal({
        links: {
            self: `${root}/posts`
        }
    });
});

app.get('/post/:postId', function post(req, res, next) {
    res.hal({
        links: {
            self: `${root}/post`
        }
    });
});

app.get('/users', function users(req, res, next) {
    res.hal({
        links: {
            self: `${root}/users`
        }
    });
});

app.get('/user/:userId', function user(req, res, next) {
    res.hal({
        links: {
            self: `${root}/user`
        }
    });
});

app.get('/links', function links(req, res, next) {
    res.hal({
        links: {
            self: `${root}/links`
        }
    });
});

app.get('/link/:linkId', function link(req, res, next) {
    res.hal({
        links: {
            self: `${root}/link`
        }
    });
});

app.use(function handle404(req, res) {
    res.status(404).hal({
        error: 'Not found'
    });
});

app.use(function handleException(err, req, res, next) {
    log.error(err.stack)
    res.status(500).hal({
        error: 'Internal server error'
    });
});

server.listen(pkg.port, err => {
    log.info(`==> ✅  App is running on port ${pkg.port}.`);
});
