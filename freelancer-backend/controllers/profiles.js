const Profile = require('../models').Profile;
const User = require('../models').User;
const Skill = require('../models').Skill;
const kafka = require('../kafka/client');
module.exports = {
    retrieve(req, res) {
        console.log(req.user);

        kafka.make_request('retrieve_profile', {
            body: req.body,
            user: req.user,
            params: req.params
        }, function (err, results) {
            console.log('in retrieve profile cb');
            console.log(results);
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.status(results.code).send(results.value);

            }
        });

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
    update(req, res) {
        console.log(req.body);
        console.log(req.file);

        kafka.make_request('update_profile', {body: req.body, user: req.user, file: req.file}, function (err, results) {
            console.log('in update profile cb');
            console.log(results);
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.status(results.code).send(results.value);

            }
        });


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
        // }

    }

}