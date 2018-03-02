var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var HTTPStatus = require('../helpers/lib/http_status');
var constant = require('../helpers/lib/constant');


var Matches = mongoose.model('Matches');

var sendJSONResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

//  Config upload photo
var multer = require('multer');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'uploads/Matches')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});
var upload = multer({
    storage: storage
}).single('file');

//  match a match
module.exports.newMatch = function (req, res) {
    upload(req, res, function (err) {
        if (err)
            return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                success: false,
                message: err
            });
        var data = req.body;

        var match = new Matches(data);
        match.save(function (err, match) {
            if (err)
                return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                    success: false,
                    message: err
                });
            var results = {
                success: true,
                data: match
            }
            return sendJSONResponse(res, HTTPStatus.CREATED, results)
        })
    });
};

module.exports.newFullMatch = function (req, res) {
    upload(req, res, function (err) {
        if (err)
            return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                success: false,
                message: err
            });
        req.body.type = 0;
        var data = req.body;

        var match = new Matches(data);
        match.save(function (err, match) {
            if (err)
                return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                    success: false,
                    message: err
                });

            var results = {
                success: true,
                data: match
            }
            return sendJSONResponse(res, HTTPStatus.CREATED, results)
        })
    });
};

module.exports.newHighlight = function (req, res) {
    upload(req, res, function (err) {
        if (err)
            return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                success: false,
                message: err
            });
        req.body.type = 1;
        var data = req.body;

        var match = new Matches(data);
        match.save(function (err, match) {
            if (err)
                return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                    success: false,
                    message: err
                });

            var results = {
                success: true,
                data: match
            }
            return sendJSONResponse(res, HTTPStatus.CREATED, results)
        })
    });
};

//  GET all Matches
module.exports.matchGetAll = function (req, res) {
    var query = req.query || {};
    const id = req.query.id;
    delete req.query.id;
    const type = req.query.type;
    delete req.query.type;
    var sort = req.query.sort || '-createdAt';
    delete req.query.sort;
    if (id)
        query = {
            "_id": {$in: id}
        };
    else if (type)
        query = {
            "type": {$in: type}
        };
    else
        query = {};
    Matches.paginate(
        query,
        {
            sort: sort,
            page: Number(req.query.page),
            limit: Number(req.query.limit)
        }, function (err, match) {
            if (err)
                return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                    success: false,
                    message: err
                });
            var results = {
                data: match.docs,
                total: match.total,
                limit: match.limit,
                page: match.page,
                pages: match.pages
            };

            return sendJSONResponse(res, HTTPStatus.OK, results);
        }
    )
};

module.exports.matchGetOne = function (req, res) {
    Matches.findById(req.params.id)
        .exec(function (err, match) {
            if (err)
                return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                    success: false,
                    message: err
                });
            if (!match)
                return sendJSONResponse(res, HTTPStatus.NOT_FOUND, {
                    success: false,
                    message: 'match not founded'
                });
            var results = {
                success: true,
                data: match
            }

            return sendJSONResponse(res, HTTPStatus.OK, results)
        })
};
//  PUT a match
module.exports.matchPUT = function (req, res) {
    req.body.updatedAt = Date.now();

    upload(req, res, function (err) {
        if (err)
            return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                success: false,
                message: err
            });
        var data = req.body;
        Matches.findByIdAndUpdate(req.params.id, data, {'new': true}, function (err, match) {
            if (err)
                return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                    success: false,
                    message: err
                });
            if (!match)
                return sendJSONResponse(res, HTTPStatus.NOT_FOUND, {
                    success: false,
                    message: "match's not founded"
                });
            var results = {
                success: true,
                data: match
            }
            return sendJSONResponse(res, HTTPStatus.OK, results)
        })
    });
};

//  DEL a match
module.exports.matchDEL = function (req, res) {
    if (req.params.id)
        Matches.findByIdAndRemove(req.params.id, function (err) {
            if (err)
                return sendJSONResponse(res, HTTPStatus.NOT_FOUND, {
                    success: false,
                    message: err
                });
            return sendJSONResponse(res, HTTPStatus.NO_CONTENT, {
                success: true,
                message: 'match was deleted'
            })
        });
};