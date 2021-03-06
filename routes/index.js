var express = require('express');
var router = express.Router();
var url = require('url');
var staticModel = require('../models/static_db.js');
var profileModel = require('../models/profile_db');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.user){
        //console.log(req.session);

        var studentData = {};
        var profileExists = 1;
        profileModel.find({owner : req.session.user._id}, function(err, data){
            studentData = data;
            if(studentData.length==0)
            {
                profileExists = 0;
            }

            res.render('index', {
                title: 'Graduate Recruitment System',
                userdata: req.session.user,
                profileExists:profileExists
            });
        });

    }else{
        res.redirect('/starting');
    }
});

router.get('/cleanSession', function(req, res, next) {
    req.session.destroy(function(err) {
        if(err){
            res.json({ret_code: 2, ret_msg: 'logout failed'});
        }else{
            res.clearCookie('mycookie');
            res.json({ret_code: 0, ret_msg: 'logout successfully'});

        }
    });
});

router.post('/get_function', function(req, res){
    staticModel.getFunction(req.body.number, function(err, data){
        if (err){
            res.json({status:err, flag:0});
        }else {
            res.json({status:data, flag:1})
        }
    });
});

module.exports = router;