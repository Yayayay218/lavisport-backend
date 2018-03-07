var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');

var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});


var authCtrl = require('../controllers/auth');
var matchCtrl = require('../controllers/matches');
var fileCtrl = require('../controllers/file');
var livestreamCtrl = require('../controllers/livestreams')

var passport = require('passport');

//  Match
router.post('/matches', matchCtrl.newMatch);
router.get('/matches', matchCtrl.matchGetAll);
router.get('/matches/:id', matchCtrl.matchGetOne);
router.put('/matches/:id', matchCtrl.matchPUT);
router.delete('/matches/:id', matchCtrl.matchDEL);

//  FullMatch
router.post('/fullMatches', auth, matchCtrl.newFullMatch);
router.get('/fullMatches', auth, matchCtrl.matchGetAll);
router.get('/fullMatches/:id', auth, matchCtrl.matchGetOne);
router.put('/fullMatches/:id', auth, matchCtrl.matchPUT);
router.delete('/fullMatches/:id', auth, matchCtrl.matchDEL);

//  Highlight
router.post('/highlights', auth, matchCtrl.newHighlight);
router.get('/highlights', auth, matchCtrl.matchGetAll);
router.get('/highlights/:id', auth, matchCtrl.matchGetOne);
router.put('/highlights/:id', auth, matchCtrl.matchPUT);
router.delete('/highlights/:id', auth, matchCtrl.matchDEL);


//  Livestream
router.post('/livestreams', livestreamCtrl.newLivestream)
router.get('/livestreams', livestreamCtrl.livestreamGetAll)
router.get('/livestreams/:id', livestreamCtrl.livestreamGetOne)
router.put('/livestreams/:id', livestreamCtrl.livestreamPUT)
router.delete('/livestreams/:id', livestreamCtrl.livestreamDEL)

router.get('/livestreams/:id/:channelId', livestreamCtrl.getChannel);
//  File
router.post('/files', fileCtrl.uploadFile);


//  Auth
router.post('/auth/register', authCtrl.register);
router.post('/auth/login', authCtrl.login);

router.post('/auth/facebook',
    passport.authenticate('facebook-token'),
    authCtrl.loginSocial
);
router.post('/auth/twitter',
    passport.authenticate('twitter-token'),
    authCtrl.loginSocial
);
//  User
router.get('/me', auth, authCtrl.userGETInfo);
router.put('/me', auth, authCtrl.userPUT);

router.post('/videos', livestreamCtrl.getVideoInfo)

//  Crawler

module.exports = router;
