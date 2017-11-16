var express = require('express');
var app = express();
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var paginate = require('express-paginate');
var swaggerUi = require('swagger-ui-express');
var passport = require('passport');
var JsonRefs = require('json-refs');
var YAML = require('js-yaml');

require('./models/db');
require('./config/passport');

var cors = require('cors'); // call the cors to fix access control bug.

app.use(cors());

var routesApi = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(favicon());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser({limit: '50mb'}));

app.use(cookieParser());

app.use(paginate.middleware(50, 50)); // limit=10,  maxLimit=50


app.use(express.static(path.join(__dirname, 'node_modules/swagger-ui-express/static')));
app.use(express.static(path.join(__dirname, 'views')));
// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public')));
// app.get('/admin', function (req, res) {
//     res.sendFile(path.join(__dirname, 'views', 'admin.html'));
// });

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use('/uploads/media', express.static(path.join(__dirname, 'uploads/media')));


var optionsRef = {
    filter: ['relative', 'remote'],
    loaderOptions: {
        processContent: function (res, cb) {
            cb(undefined, YAML.safeLoad(res.text));
        }
    }
};

JsonRefs.resolveRefsAt('./swagger/index.yaml', optionsRef).then(function (results) {
    // console.log(results.resolved);
    // console.log("================refs ",results.refs);
    app.get('/api-docs', swaggerUi.serve, swaggerUi.setup(results.resolved));
}, function (err) {
    console.log(err.stack);
});

app.use(passport.initialize());

app.use('/api', routesApi);

app.get('/auth/facebook',
    passport.authenticate('facebook', {scope: ['public_profile', 'email', 'user_friends']}));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message": err.name + ": " + err.message});
    }
});

module.exports = app;
