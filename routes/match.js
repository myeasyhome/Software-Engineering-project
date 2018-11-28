var express = require('express');
var router = express.Router();
var projectModel = require('../models/project_db.js');
var matchModel = require('../models/match_db.js');


router.get('/result_for_student', function(req, res) {
    if (req.session.user){
        matchModel.find({student: req.session.user._id})
            .populate('project')
            .exec(function(err, match_data) {
                if(err){
                    console.log(err);
                }else{
                    console.log(match_data);
                    res.render('project_match', {
                        title: 'match result',
                        userdata: req.session.user,
                        status: 'ok',
                        data: match_data,
                    });
                }
            })
    }else {
        res.redirect('/login');
    }
});

router.get('/result_for_manager', function(req, res) {
    if (req.session.user){
        matchModel.find().
            populate({path: 'project', select: 'project_name'}).
            populate({path:'student', select: 'address', populate: { path: 'owner' }}).
            exec(function (err, match_data) {
                if(err){
                    console.log(err);
                }else{
                    console.log(match_data);
                    res.render('manager_match', {
                        title: 'match result',
                        userdata: req.session.user,
                        status: 'ok',
                        match_data: match_data
                    });
                }

        });
    }else {
        res.redirect('/login');
    }
});

router.get('/communication', function(req, res) {
    if (req.session.user){
        res.render('communication');
    }else {
        res.redirect('/login');
    }
});

module.exports = router;