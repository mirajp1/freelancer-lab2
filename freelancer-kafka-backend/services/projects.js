const mongoose = require('mongoose');
const Project = require('../models').Project;
const User = require('../models').User;
const Skill = require('../models').Skill;

function projectsAvgBid(projects,callback){

    projects.forEach(function(item){
        projectAvgBid(item);
    })

    callback();

}

function projectAvgBid(project){

    let ans = 0.0;
    let count = 0;
    project.bids.forEach(function(item){
        ans+= item.bid_amount? item.bid_amount : 0
        count++;
    })
    if(count>0)
        project.average_bid=ans/count
    else
        project.average_bid=0;
}


module.exports = {
    retrieve(req, cb) {
        let res = {}
        console.log(req.params);
        console.log(req.user);

        Project.findOne({_id:req.params.id})
            .lean(true)
            .populate('creator')
            .populate('skills')
            .populate('freelancer')
            .populate('bids.bidder')
            .exec((err,project)=>{
                console.log(project);
                if(err){
                    res.code = 400;
                    res.value = {error:error};
                    cb(null,res);
                }
                else if(project){
                    projectsAvgBid([project],function(){
                        // console.log("cb"+projects[0].average_bid);
                        res.code=201;
                        res.value=project;
                        cb(null,res);
                    })

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
                                    res.value = {error:error};
                                    cb(null,res);
                                });
                        })
                        .catch(error => {
                            res.code = 400;
                            res.value = {error:error};
                            cb(null,res);
                        });

                })
                .catch(error => {
                    res.code = 400;
                    res.value = {error:error};
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
                        {$push:{bids:bid}},{new:true})
                        .then((project)=>{
                            if(project) {
                                User.findOneAndUpdate({_id: req.user._id}, {$push: {bidded_projects: project._id}})
                                    .then(() => {
                                        res.code = 201;
                                        res.value = project.bids;
                                        cb(null, res);
                                    })
                                    .catch(error => {
                                        res.code = 400;
                                        res.value = {error:error};
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
    hire(req, cb) {

        let res ={}
        console.log(req.body);

        Project.findOne({
            "_id":req.params.id,
            "creator":req.user._id
        })
            .then(project =>{
                if(!project) {
                    res.code = 400;
                    res.value = {error: "No such project exists or your are not the creator"}
                    cb(null,res)
                }
                else{

                    Project.find({
                        _id:req.params.id,
                        freelancer:{$ne:null}
                    })
                        .then((project)=> {

                            if (project && project.length===1) {
                                console.log(project);
                                res.code = 400;
                                res.value = {error: "You can't hire freelancer again for this project!"}
                                cb(null, res)
                            }
                            else {
                                Project.findOneAndUpdate(
                                    {_id: req.params.id},
                                    {freelancer: req.body.userId,status:"HIRED"}, {new: true})
                                    .then((project) => {
                                        if (project) {
                                            res.code = 201;
                                            res.value = project;
                                            cb(null, res);
                                        }
                                        else {
                                            res.code = 404;
                                            res.value = {error: "Project not found!"};
                                            cb(null, res);
                                        }

                                    })
                                    .catch(error => {
                                        res.code = 400;
                                        res.value = error;
                                        cb(null, res);
                                    });
                            }

                        })
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
                    res.value = {error:err};
                    cb(null,res);
                }
                else if(projects){
                    res.code=201;
                    res.value=projects;
                    cb(null,res);
                }
                // else{
                //     res.code=404;
                //     res.value={error:"projects not found!"};
                //     cb(null,res);
                // }
            })


    },
    retrieveAllBidded(req, cb) {
        console.log(req.user);

        let res = {}
        Project.find(
            {
                "bids.bidder":req.user._id
            }
        )
            .lean(true)
            .populate('creator')
            .populate('skills')
            .populate('freelancer')
            .populate('bids.bidder')
            .exec((err,projects)=>{
                console.log(projects);
                if(err){
                    res.code = 400;
                    res.value = {error:err};
                    cb(null,res);
                }
                else if(projects){
                    projectsAvgBid(projects,function(){
                        // console.log("cb"+projects[0].average_bid);
                        res.code=201;
                        res.value=projects;
                        cb(null,res);
                    })

                }
                // else{
                //     res.code=404;
                //     res.value={error:"projects not found!"};
                //     cb(null,res);
                // }
            })

    },
    retrieveAllCreated(req, cb) {
        console.log(req.user);

        let res = {}
        Project.find(
            {
                "creator":req.user._id
            }
        )
            .lean(true)
            .populate('creator')
            .populate('skills')
            .populate('freelancer')
            .populate('bids.bidder')
            .exec((err,projects)=>{
                console.log(projects);
                if(err){
                    res.code = 400;
                    res.value = {error:err};
                    cb(null,res);
                }
                else if(projects){
                    projectsAvgBid(projects,function(){
                        // console.log("cb"+projects[0].average_bid);
                        res.code=201;
                        res.value=projects;
                        cb(null,res);
                    })

                }
                // else{
                //     res.code=404;
                //     res.value={error:"projects not found!"};
                //     cb(null,res);
                // }
            })
    },
    retrieveAllRelevant(req, cb) {
        console.log(req.user);

        let res = {}

        // let user_skills=[mongoose.Types.ObjectId('5ac7cf2e734d1d2fb54281f8')]
        User.findOne({_id:req.user._id})
            .then(user=>{
                Project.aggregate(
                    [
                        { "$match": { "skills.0": { "$exists": true } } },
                        { "$redact": {
                                "$cond": [
                                    { "$gte": [
                                            { "$size": { "$setIntersection": [ "$skills", user.skills ] } },
                                            1
                                        ]},
                                    "$$KEEP",
                                    "$$PRUNE"
                                ]
                            }},
                        {
                            "$project":{_id:1}
                        }
                    ]
                )
                    .exec((err,projects)=>{
                        console.log(projects);
                        if(err){
                            res.code = 400;
                            res.value = {error:err};
                            cb(null,res);
                        }
                        else if(projects){
                            let ids = []
                            projects.forEach(function(item){
                                ids.push(item._id)
                            })
                            Project.find({'_id': {$in:ids}  })
                                .lean(true)
                                .populate('creator')
                                .populate('skills')
                                .populate('freelancer')
                                .populate('bids.bidder')
                                .exec((err,projects)=>{
                                    console.log(projects);
                                    if(err){
                                        res.code = 400;
                                        res.value = {error:err};
                                        cb(null,res);
                                    }
                                    else if(projects){
                                        projectsAvgBid(projects,function(){
                                            // console.log("cb"+projects[0].average_bid);
                                            res.code=201;
                                            res.value=projects;
                                            cb(null,res);
                                        })

                                    }
                                    // else{
                                    //     res.code=404;
                                    //     res.value={error:"projects not found!"};
                                    //     cb(null,res);
                                    // }
                                })

                        }
                        else{
                            res.code=404;
                            res.value={error:"projects not found!"};
                            cb(null,res);
                        }
                    })
            })
            .catch(err=>{
                res.code=400;
                res.value={error:err};
                cb(null,res);
            })

    },
    makePayment(req,cb){
        console.log(req.user);
        console.log(req.body);

        let res ={}

        let transaction={
            from: req.user._id,
            project:req.params.id,
            type: 'TRANSFER',
        }


        Project.findOne({_id:req.params.id,"bids.bidder":req.user._id})
            .then((project)=>{
                if(project && project.freelancer){
                    transaction.to=project.freelancer;
                    project.bids.some(function(item){
                        if(item.bidder.equals(mongoose.Types.ObjectId(''+project.freelancer))){
                            transaction.amount=item.bid_amount;
                            console.log("found the bid!");
                            return true;
                        }
                    })

                    User.findOne({_id:req.user._id})
                        .then((user)=>{

                            if(user.balance < transaction.amount){
                                res.code=400;
                                res.value={error:"Not enough balance to transfer"}
                                cb(null,res);
                            }
                            else{
                                User.findOneAndUpdate(
                                    {_id: req.user._id},
                                    {
                                        $inc: {balance: -1*transaction.amount},
                                        $push: {transactions: transaction}
                                    }
                                    ,
                                    {new: true})
                                    .populate('skills')
                                    .exec((err, user) => {
                                        if (err) {
                                            res.code = 400;
                                            res.value = {error: err};
                                            cb(null, res);
                                        }
                                        else if (user) {

                                            User.findOneAndUpdate(
                                                {_id: transaction.to},

                                                {
                                                    $inc: {balance: transaction.amount},
                                                    $push: {transactions: transaction}
                                                }
                                                ,
                                                {new: true})
                                                .populate('skills')
                                                .exec((err, user) => {
                                                    if (err) {
                                                        res.code = 400;
                                                        res.value = {error: err};
                                                        cb(null, res);
                                                    }
                                                    else if (user) {
                                                        Project.findOneAndUpdate(
                                                            {_id:req.params.id},
                                                            {status:"CLOSED"},{new:true}
                                                            )
                                                            .then((project)=>{
                                                                res.code=200;
                                                                res.value=project;
                                                                cb(null,res);
                                                            })
                                                            .catch(error => {
                                                                res.code = 400;
                                                                res.value = error;
                                                                cb(null,res);
                                                            });
                                                    }
                                                    else {
                                                        res.code = 404;
                                                        res.value = {error: "user not found!"};
                                                        cb(null, res);
                                                    }
                                                })

                                        }
                                        else {
                                            res.code = 404;
                                            res.value = {error: "user not found!"};
                                            cb(null, res);
                                        }
                                    })
                            }

                        })
                        .catch(error => {
                            res.code = 400;
                            res.value = error;
                            cb(null,res);
                        });

                }
                else{
                    res.code = 400;
                    res.value = {error:"Bid not found for this user on this project"};
                    cb(null,res);
                }
            })




    },
    submitSolution(req,cb){
        console.log(req.user);
        console.log(req.file);
        console.log(req.body);

        let res ={}

        if(req.body && req.body.text===""){
            res.code = 400;
            res.value = {error:"Cannot have empty solution name"};
            cb(null,res);
        }
        else{


            var filePath="";
            if(req.file) {
                var filePath="/uploads/project/"+req.file.filename;
            }

            var solution = {
                text:req.body.text,
            }
            if(filePath!=="")
                solution.solution_file=filePath


            Project.findOneAndUpdate({_id:req.params.id},{solution:solution,status:"CLOSED"},{new:true})
                .then((project)=> {

                    res.code=200;
                    res.value=project;
                    cb(null,res);

                })
                .catch(error => {
                    res.code = 400;
                    res.value = {error:error};
                    cb(null,res);
                });


        }

    }

};
