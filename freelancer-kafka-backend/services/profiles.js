const Profile = require('../models').Profile;
const User = require('../models').User;
const Skill = require('../models').Skill;

module.exports = {
    retrieve(req, cb) {
        console.log(req.user);

        let res = {}
        User.findOne({_id:req.user._id})
            .populate('skills')
            .populate('transactions.to')
            .populate('transactions.from')
            .populate('transactions.project')
            .exec((err,user)=>{
                if(err){
                    res.code = 400;
                    res.value = {error:error};
                    cb(null,res);
                }
                else if(user){
                    res.code=200;
                    res.value=user;
                    cb(null,res);
                }
                else{
                    res.code=404;
                    res.value={error:"user not found!"};
                    cb(null,res);
                }
            })

        // return Profile
        //     .findOne({
        //         where:{userId:req.params.id},
        //         include:[{
        //             model:User,
        //             as:'puser',
        //             include:[Skill]
        //         }]
        //     } )
        //     .then(profile => {
        //         // console.log(profile);
        //         res.status(201).send(profile)
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         res.status(400).send(error)
        //     });
    },
    update(req,cb){
        console.log(req.user);
        console.log(req.body);
        console.log(req.file);

        let res = {}
        var filePath="";
        if(req.file) {
            var filePath="/uploads/profile/"+req.file.filename;
        }

        var newUser = {
            name:req.body.name,
            about:req.body.about,
            email:req.body.email,
            phone:req.body.phone,
        }
        if(filePath!=="")
            newUser.image=filePath

        User.findOneAndUpdate(
            {_id:req.user._id},

                newUser
            ,
            {new:true})
            .populate('skills')
            .exec((err,user)=>{
                if(err){
                    res.code = 400;
                    res.value = {error:error};
                    cb(null,res);
                }
                else if(user){
                    res.code=200;
                    res.value=user;
                    cb(null,res);
                }
                else{
                    res.code=404;
                    res.value={error:"user not found!"};
                    cb(null,res);
                }
            })

        // var filePath="";
        // if(req.file) {
        //     var filePath="/uploads/profile/"+req.file.filename;
        // }
        // return Profile
        //     .findOne({
        //         where:{userId:req.user.id},
        //         include:[{
        //             model:User,
        //             as:'puser'
        //         }]
        //     } )
        //     .then(profile => {
        //         // console.log(profile);
        //
        //         if(profile){
        //             profile.update({
        //                 image:filePath==="" ? profile.image : filePath,
        //                 name:req.body.name,
        //                 about:req.body.about,
        //                 email:req.body.email,
        //                 phone:req.body.phone,
        //             })
        //                 .then((profile)=>{
        //                     res.status(201).send(profile)
        //                 })
        //         }
        //         else {
        //             res.status(400).send({error:"profile not found!"});
        //
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         res.status(400).send(error)
        //     });
        }

    }

