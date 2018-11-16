var express = require('express');
var crypto = require('crypto');
var url = require('url');
var router = express.Router();
var profileModel = require('../models/profile_db.js');
var userModel = require('../models/user_mgmt_db.js');


router.get('/profileview', function(req, res){
    if(req.session.user && req.session.user.usertype == 'student'){
        profileModel.listByOwner({owner: req.session.user.username}, function(err, data){
            if (err){
                res.json(err);
            }else {
                res.render('profile_view', {
                    title: 'manage profile',
                    userdata: req.session.user,
                    maxpage: parseInt((data.length-1)/10)+1,
                });
            }
        });
    }else {
        res.redirect('/login');
    }
});

router.get('/create_profile', function(req, res){
    if(req.session.user && req.session.user.usertype == 'student'){
        userModel.userAccInfo({username:req.session.user.username}, function(err, data){
            if (err == 'ok'){
                var profileData = {
                    //realname: data.realname,
                };
                res.render('studentForm', {
                    title:'Create Profile',
                    userdata: req.session.user,
                    profileData: profileData,
                });
            }else {
                res.json(err);
            }
        });
    }else {
        res.redirect('/login');
    }
});

router.post('/create_profile', function(req, res){
    if(req.session.user && req.session.user.usertype == 'student'){
        profileModel.listByOwner({owner: req.session.user.username}, function(err, data){
            if (err){
                res.redirect('/404');
            }else {
                var isNoDefault = true;
                for (var i in data){
                    if(data[i].isDefault){
                        isNoDefault = false;
                        break;
                    }
                }
                var profileData = req.body;
                if (isNoDefault){
                    profileData['isDefault'] = true;
                    profileData['isPublic'] = true;
                }else {
                    profileData['isDefault'] = false;
                    profileData['isPublic'] = false;
                }
                profileData['salary'] = JSON.parse(profileData.salary);
                // console.log(profileData);
                profileModel.createResume(profileData, function(status){
                    if (status == 'ok'){
                        res.json({status:status, flag:1});
                    }else {
                        res.json({status:status, flag:0});
                    }
                });
            }
        });
    }else {
        res.json({status:"未登录", flag:0});
    }
});

module.exports = router;