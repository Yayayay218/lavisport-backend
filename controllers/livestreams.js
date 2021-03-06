var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var HTTPStatus = require('../helpers/lib/http_status');
var constant = require('../helpers/lib/constant');
var youtubedl = require('youtube-dl');


var Livestreams = mongoose.model('Livestreams');

var sendJSONResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

//  Config upload photo
var multer = require('multer');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'uploads/Livestreams')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});
var upload = multer({
    storage: storage
}).single('file');

//  livestream a livestream
module.exports.newLivestream = function (req, res) {
    upload(req, res, function (err) {
        if (err)
            return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                success: false,
                message: err
            });
        var data = req.body;

        var livestream = new Livestreams(data);
        livestream.save(function (err, livestream) {
            if (err)
                return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                    success: false,
                    message: err
                });
            var results = {
                success: true,
                data: livestream
            }
            return sendJSONResponse(res, HTTPStatus.CREATED, results)
        })
    });
};

//  GET all Livestreams
module.exports.livestreamGetAll = function (req, res) {
    const page = req.query.page;
    delete req.query.page;
    const limit = req.query.limit;
    delete req.query.limit;
    var sort = req.query.sort
    delete req.query.sort
    var query = req.query || {};
    Livestreams.paginate(
        query,
        {
            sort: sort,
            page: Number(page),
            limit: Number(limit)
        }, function (err, livestream) {
            if (err)
                return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                    success: false,
                    message: err
                });
            var results = {
                data: livestream.docs,
                total: livestream.total,
                limit: livestream.limit,
                page: livestream.page,
                pages: livestream.pages
            };

            return sendJSONResponse(res, HTTPStatus.OK, results);
        }
    )
};

module.exports.livestreamGetOne = function (req, res) {
    Livestreams.findById(req.params.id)
        .exec(function (err, livestream) {
            if (err)
                return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                    success: false,
                    message: err
                });
            if (!livestream)
                return sendJSONResponse(res, HTTPStatus.NOT_FOUND, {
                    success: false,
                    message: 'livestream not founded'
                });
            var results = {
                success: true,
                data: livestream
            }

            return sendJSONResponse(res, HTTPStatus.OK, results)
        })
};
//  PUT a livestream
module.exports.livestreamPUT = function (req, res) {
    req.body.updatedAt = Date.now();

    upload(req, res, function (err) {
        if (err)
            return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                success: false,
                message: err
            });
        var data = req.body;
        Livestreams.findByIdAndUpdate(req.params.id, data, {'new': true}, function (err, livestream) {
            if (err)
                return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                    success: false,
                    message: err
                });
            if (!livestream)
                return sendJSONResponse(res, HTTPStatus.NOT_FOUND, {
                    success: false,
                    message: "livestream's not founded"
                });
            var results = {
                success: true,
                data: livestream
            }
            return sendJSONResponse(res, HTTPStatus.OK, results)
        })
    });
};

//  DEL a livestream
module.exports.livestreamDEL = function (req, res) {
    if (req.params.id)
        Livestreams.findByIdAndRemove(req.params.id, function (err) {
            if (err)
                return sendJSONResponse(res, HTTPStatus.NOT_FOUND, {
                    success: false,
                    message: err
                });
            return sendJSONResponse(res, HTTPStatus.NO_CONTENT, {
                success: true,
                message: 'livestream was deleted'
            })
        });
};

module.exports.getChannel = function (req, res) {
    Livestreams.findById(req.params.id, function (err, live) {
        if(err)
            return sendJSONResponse(res, HTTPStatus.BAD_REQUEST, {
                success: false,
                message: err
            })
        if(!live)
            return sendJSONResponse(res, HTTPStatus.NOT_FOUND, {
                success: false,
                message: 'Livestream Not found'
            })
        live.channels.map(function (item , index) {
            if(item._id == req.params.channelId)
                return sendJSONResponse(res, HTTPStatus.OK, {
                    success: true,
                    message:'OK',
                    data: item
                })
            else
                return sendJSONResponse(res, HTTPStatus.NOT_FOUND, {
                    success: false,
                    message:'Channel not fount'
                })
        })
    })
}

module.exports.getVideoInfo = function (req, res) {
    youtubedl.getInfo(req.body.url, function(err, info) {
        if (err) throw err;
        return sendJSONResponse(res, 200, {
            data: info
        })
        // console.log('id:', info.id);
        // console.log('title:', info.title);
        // console.log('url:', info.url);
        // console.log('thumbnail:', info.thumbnail);
        // console.log('description:', info.description);
        // console.log('filename:', info._filename);
        // console.log('format id:', info.format_id);
    });
}