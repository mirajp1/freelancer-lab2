const mongoose = require('mongoose');
const Project = require('../models').Project;
const User = require('../models').User;
const Skill = require('../models').Skill;

module.exports = {
    retrieve(req, cb) {
        let res = {}
        console.log(req.params);
        console.log(req.user);

        Project.findOne({_id:req.params.id})
            .populate('creator')
            .populate('skills')
            .populate('freelancer')
            .populate('bids.bidder')
            .exec((err,project)=>{
                console.log(project);
                if(err){
                    res.code = 400;
                    res.value = error;
                    cb(null,res);
                }
                else if(project){
                    res.code=201;
                    res.value=project;
                    cb(null,res);
                }
                else{
                    res.code=404;
                    res.value={error:"project not found!"};
                    cb(null,res);
                }
            })


    },
    create(req, cb) {
        console.log(req.body);
        console.log(req.user);
        var res = {};

        if(req.body.name===""){
            res.code = 400;
            res.value = {error:"Cannot have empty project name"};
            cb(null,res);
        }
        else if(req.body.name && req.body.name.length < 12){
            res.code = 400;
            res.value = {error:"Project name length must be atleast 12!"};
            cb(null,res);
        }
        else if(req.body.description===""){
            res.code = 400;
            res.value = {error:"Cannot have empty project description"};
            cb(null,res);
        }
        else if(req.body.budget_range===""){
            res.code = 400;
            res.value = {error:"Budget Range cannot be  empty!"};
            cb(null,res);
        }
        else{

            console.log(req.file);
            let filePath=""
            if(req.file){
                filePath="/uploads/project/"+req.file.filename;
            }
            let project = new  Project
                ({
                    name: req.body.name,
                    description:req.body.description,
                    budget_range:req.body.budget_range,
                    file:filePath,
                    creator:req.user._id

                })
                .save()
                .then(project => {

                    Skill.find({
                        'name': { $in: req.body.skills}
                    })
                        .then(skills=>{
                            Project.findOneAndUpdate({_id:project._id},{$push:{skills:skills}},{"new":true})
                                .then(project1=>{
                                    res.code=201;
                                    res.value=project1;
                                    cb(null,res);
                                })
                                .catch(error => {
                                    res.code = 400;
                                    res.value = error;
                                    cb(null,res);
                                });
                        })
                        .catch(error => {
                            res.code = 400;
                            res.value = error;
                            cb(null,res);
                        });

                })
                .catch(error => {
                    res.code = 400;
                    res.value = error;
                    cb(null,res);
                });
        }



    },
    bid(req, cb) {

        let res ={}
        console.log(req.body);

        Project.findOne({
            "_id":req.params.id,
            "bids.bidder":req.user._id
        })
            .then(project =>{
                if(project) {
                    res.code = 400;
                    res.value = {error: "Can't bid again on same project"}
                    cb(null,res)
                }
                else{
                    var bid ={
                        bidder:mongoose.Types.ObjectId(req.user._id),
                        bid_amount:req.body.bid_amount,
                        days:req.body.days
                    }

                    Project.findOneAndUpdate(
                        {_id:req.params.id},
                        {$push:{bids:bid}})
                        .then((project)=>{
                            if(project) {
                                User.findOneAndUpdate({_id: req.user._id}, {$push: {bidded_projects: req.user._id}})
                                    .then(() => {
                                        res.code = 201;
                                        res.value = project;
                                        cb(null, res);
                                    })
                                    .catch(error => {
                                        res.code = 400;
                                        res.value = error;
                                        cb(null, res);
                                    });
                            }
                            else{
                                res.code = 400;
                                res.value = {error:"Project not found!"};
                                cb(null,res);
                            }

                        })
                        .catch(error => {
                            res.code = 400;
                            res.value = error;
                            cb(null,res);
                        });
                }
            })
            .catch(error => {
                res.code = 400;
                res.value = error;
                cb(null,res);
            });

    },
    retrieveAllOpen(req, cb) {

        let res = {}
        Project.find(
            {
                status:"OPEN"
            }
            )
            .populate('creator')
            .populate('skills')
            .populate('freelancer')
            .populate('bids.bidder')
            .exec((err,projects)=>{
                console.log(projects);
                if(err){
                    res.code = 400;
                    res.value = error;
                    cb(null,res);
                }
                else if(projects){
                    res.code=201;
                    res.value=projects;
                    cb(null,res);
                }
                else{
                    res.code=404;
                    res.value={error:"projects not found!"};
                    cb(null,res);
                }
            })


    },
    retrieveAllBidded(req, cb) {
        console.log(req.user);

        let res = {}
        Project.find(
            {
                "bids.bidder._id":req.user._id
            }
        )
            .populate('creator')
            .populate('skills')
            .populate('freelancer')
            .populate('bids.bidder')
            .exec((err,projects)=>{
                console.log(projects);
                if(err){
                    res.code = 400;
                    res.value = error;
                    cb(null,res);
                }
                else if(projects){
                    res.code=201;
                    res.value=projects;
                    cb(null,res);
                }
                else{
                    res.code=404;
                    res.value={error:"projects not found!"};
                    cb(null,res);
                }
            })

    },
    retrieveAllCreated(req, cb) {
        console.log(req.user.id);

        let res = {}
        Project.find(
            {
                "creator":req.user._id
            }
        )
            .populate('creator')
            .populate('skills')
            .populate('freelancer')
            .populate('bids.bidder')
            .exec((err,projects)=>{
                console.log(projects);
                if(err){
                    res.code = 400;
                    res.value = error;
                    cb(null,res);
                }
                else if(projects){
                    res.code=201;
                    res.value=projects;
                    cb(null,res);
                }
                else{
                    res.code=404;
                    res.value={error:"projects not found!"};
                    cb(null,res);
                }
            })
    },
};
