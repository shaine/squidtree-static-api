const createSelector = require('reselect').createSelector;
const Express = require('express');
const http = require('http');
const pkg = require('./package');
const bunyan = require('bunyan');
const hal = require('express-hal');
const {
    getPostById,
    getPostsByUserId,
    getPostsHasNextPage
} = require('./src/posts');
const {
    getUserById
} = require('./src/users');
const {
    getContentByUserId,
} = require('./src/content');

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

const searchLink = {
    href: `${root}/search{?term}`,
    rel: 'search',
    templated: true
};

const postsLink = {
    href: `${root}/posts{?page}`,
    rel: 'posts',
    templated: true
};

function getLinksForPost(post) {
    return {
        self: `${root}/post/${post.id}`,
        posts: postsLink
    };
}

function getLinksForUser(user) {
    return {
        self: `${root}/user/${user.id}`
    };
}

app.get('/', function index(req, res, next) {
    res.hal({
        links: {
            self: `${root}/`,
            search: searchLink,
            posts: postsLink
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
    const page = parseInt(req.query.page, 10) || 0;
    const hasNextPage = getPostsHasNextPage(db, page);
    const posts = getContentByUserId(db, page);

    if (!posts.length) {
        return next();
    }

    let queryParams = '';
    if (page) {
        queryParams += `page=${page}`;
    }
    if (queryParams) {
        queryParams = `?${queryParams}`;
    }

    const links = {
        self: `${root}/posts${queryParams}`,
        posts: postsLink
    };

    if (getPostsHasNextPage(db, page)) {
        links.next = {
            href: `${root}/posts?page=${page + 1}`,
            rel: 'nextPosts'
        };
    }

    if (page) {
        const prevPage = page - 1;
        const prevQueryParams = prevPage ? `?page=${prevPage}` : '';
        links.previous = {
            href: `${root}/posts${prevQueryParams}`,
            rel: 'previousPosts'
        };
    }

    res.hal({
        links,
        data: {
            posts: posts.map(post => Object.assign({}, post, {
                links: getLinksForPost(post),
                user: Object.assign({}, post.user, {
                    links: getLinksForUser(post.user)
                })
            }))
        }
    });
});

app.get('/post/:postId', function post(req, res, next) {
    const postId = parseInt(req.params.postId, 10);
    const post = getPostById(db, postId);

    if (!post) {
        return next();
    }

    const linkedPost = Object.assign({}, post);
    linkedPost.user = Object.assign({}, post.user, {
        links: getLinksForUser(post.user)
    });

    res.hal({
        links: getLinksForPost(post),
        data: {
            post: linkedPost
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
    const userId = parseInt(req.params.userId, 10);
    const user = getUserById(db, userId);
    const posts = getPostsByUserId(db, userId);

    if (!user) {
        return next();
    }

    res.hal({
        links: getLinksForUser(user),
        data: {
            user,
            posts
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
    res.status(404).json({
        error: 'Not found'
    });
});

app.use(function handleException(err, req, res, next) {
    log.error(err.stack)
    res.status(500).json({
        error: 'Internal server error'
    });
});

server.listen(pkg.port, err => {
    log.info(`==> ✅  App is running on port ${pkg.port}.`);
});
