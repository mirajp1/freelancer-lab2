const Project = require('../models').Project;
const User = require('../models').User;
const Skill = require('../models').Skill;
const Bid = require('../models').Bid;
const Profile = require('../models').Profile;
const sequelize =require( "sequelize");
const kafka = require('../kafka/client')

module.exports = {
    retrieve(req, res) {
        console.log(req.params);
        console.log(req.user.id);

        kafka.make_request('retrieve_project',{body:req.body,user:req.user,params:req.params}, function(err,results){
            console.log('in retrieve project cb');
            console.log(results);
            if(err){
                console.log(err);
                res.status(500).send(err);
            }
            else
            {
                res.status(results.code).send(results.value);

            }
        });

        // return Project
        //     .findOne({
        //         where:{id:req.params.id},
        //         include:[User,Skill,{
        //             model: Bid,
        //
        //             include:[{all:true},{
        //                 model:User,
        //                 include:[Profile],
        //
        //             }]
        //         }],
        //     } )
        //     .then(project => {
        //         // console.log(project);
        //         res.status(201).send(project)
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         res.status(400).send(error)
        //     });
    },
    create(req, res) {
        console.log(req.body);

        kafka.make_request('create_project_topic',{body:req.body,user:req.user,file:req.file}, function(err,results){
            console.log('in create project cb');
            console.log(results);
            if(err){
                console.log(err);
                res.status(500).send(err);
            }
            else
            {
                res.status(results.code).send(results.value);

            }
        });


        // if(req.body.name===""){
        //     res.status(400).send({error:"Cannot have empty project name"});
        // }
        // else if(req.body.name && req.body.name.length < 12){
        //     res.status(400).send({error:"Project name length must be atleast 12!"});
        // }
        // else if(req.body.description===""){
        //     res.status(400).send({error:"Cannot have empty project description"});
        // }
        // else if(req.body.budget_range===""){
        //     res.status(400).send({error:"Budget Range cannot be  empty!"});
        // }
        //
        //
        // console.log(req.file);
        // let filePath=""
        // if(req.file){
        //     filePath="/uploads/project/"+req.file.filename;
        // }
        // return Project
        //     .create({
        //         name: req.body.name,
        //         description:req.body.description,
        //         budget_range:req.body.budget_range,
        //         file:filePath
        //
        //     })
        //     .then(project => {
        //         project.setSkills(req.body.skills)
        //             .then(skill=>{
        //                 project.setUser(req.user.id)
        //                     .then((user)=>{
        //                         res.status(201).send(project)
        //                     })
        //                     .catch(error => res.status(400).send(error))
        //             })
        //         .catch(error => res.status(400).send(error))
        //
        //     })
        //     .catch(error => res.status(400).send(error));
    },
    bid(req, res) {
        console.log(req.params.id);
        console.log(req.body);

        kafka.make_request('project_bid',{body:req.body,params:req.params,user:req.user}, function(err,results){
            console.log('in retrieve_all_open_projects cb');
            console.log(results);
            if(err){
                console.log(err);
                res.status(500).send(err);
            }
            else
            {
                res.status(results.code).send(results.value);

            }
        });

        // return Bid
        //     .findOne({
        //         where:{userId:req.user.id,projectId:req.params.id}
        //     })
        //     .then(bid => {
        //         if(bid){
        //             res.status(400).send({error:"Can't bid again on same project"});
        //         }
        //         else{
        //             Bid.create({
        //                 UserId:req.user.id,
        //                 ProjectId:req.params.id,
        //                 bid_amount:req.body.bid_amount,
        //                 days:req.body.days
        //             })
        //                 .then(bid=>{
        //
        //                     Bid.findOne({
        //                         where:{id:bid.id},
        //                         include:[{
        //                         model:User,
        //                             include:[Profile]
        //                         }]})
        //                         .then((bid)=>{
        //                             console.log(bid);
        //                             res.status(200).send(bid);
        //                         })
        //                         .catch(error => res.status(400).send(error));
        //
        //                 })
        //                 .catch(error => res.status(400).send(error));
        //
        //         }
        //
        //     })
        //     .catch(error => res.status(400).send(error));
    },
    retrieveAll(req, res) {

        kafka.make_request('retrieve_all_open_projects',{body:req.body}, function(err,results){
            console.log('in retrieve_all_open_projects cb');
            console.log(results);
            if(err){
                console.log(err);
                res.status(500).send(err);
            }
            else
            {
                res.status(results.code).send(results.value);

            }
        });

        // return Project
        //     .findAll({
        //         include:[{
        //             model:User,
        //             include:[{all:true},
        //                 {model:Profile}
        //             ]
        //         },Skill,{
        //             model: Bid,
        //
        //             include:[{all:true},{
        //                 model:User,
        //                 include:[Profile],
        //
        //             }]
        //         }],
        //     } )
        //     .then(project => {
        //         // console.log(project);
        //         res.status(201).send(project)
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         res.status(400).send(error)
        //     });
    },
    retrieveAllBidded(req, res) {
        console.log(req.user.id);

        kafka.make_request('retrieve_all_bidded_projects',{body:req.body,user:req.user}, function(err,results){
            console.log('in retrieve_all_bidded_projects cb');
            console.log(results);
            if(err){
                console.log(err);
                res.status(500).send(err);
            }
            else
            {
                res.status(results.code).send(results.value);

            }
        });

        // return Project
        //     .findAll({
        //         include:[{
        //             model:User,
        //             include:[
        //                 {model:Profile}
        //             ]
        //         },Skill,{
        //             model: Bid,
        //             where:{UserId:req.user.id},
        //
        //             include:[{all:true},{
        //                 model:User,
        //                 include:[Profile],
        //
        //             }]
        //         }],
        //     } )
        //     .then(project => {
        //         // console.log(project);
        //         res.status(201).send(project)
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         res.status(400).send(error)
        //     });
    },
    retrieveAllCreated(req, res) {
        console.log(req.user.id);

        kafka.make_request('retrieve_all_created_projects',{body:req.body,user:req.user}, function(err,results){
            console.log('in retrieve_all_created_projects cb');
            console.log(results);
            if(err){
                console.log(err);
                res.status(500).send(err);
            }
            else
            {
                res.status(results.code).send(results.value);

            }
        });

        // return Project
        //     .findAll({
        //         where:{UserId:req.user.id},
        //         include:[{
        //             model:User,
        //             include:[
        //                 {model:Profile}
        //             ]
        //         },Skill,{
        //             model: Bid,
        //             include:[{all:true},{
        //                 model:User,
        //                 include:[Profile],
        //
        //             }]
        //         }],
        //     } )
        //     .then(project => {
        //         // console.log(project);
        //         res.status(201).send(project)
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         res.status(400).send(error)
        //     });
    },
    retrieveAllRelevant(req, res) {

        kafka.make_request('retrieve_all_relevant_projects', {body: req.body,user:req.user}, function (err, results) {
            console.log('in retrieve_all_relevant_projects cb');
            console.log(results);
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.status(results.code).send(results.value);

            }
        });
    },
};
