
var User = require('../models/').User;

module.exports = {
    create(req, cb) {

        var res = {};
        console.log("In create user request:"+ JSON.stringify(req));

        if(!req.body){
            res.code = 500;
            res.value = "error";
            cb(null,res);
        }
        else if(req.body && req.body.email===""){
            res.code = 400;
            res.value = "Cannot have empty email";
            cb(null,res);
        }
        else if(req.body && req.body.password===""){
            res.code = 400;
            res.value = "Cannot have empty password";
            cb(null,res);
        }
        else if(req.body && req.body.password && req.body.password.length < 8){
            res.code = 400;
            res.value = "Password length must be atleast 8!";
            cb(null,res);
        }
        else if(req.body && req.body.userType && req.body.userType.length ===0){
            res.code = 400;
            res.value = "User type is required!";
            cb(null,res);
        }
        else {

            new User({
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType
            })
                .save()

                .then(user => {
                    res.code = 201;
                    res.value = user;
                    cb(null,res);

                })
                .catch(error => {
                    res.code = 400;
                    res.value = error;
                    cb(null,res);
                });
        }
    },
    validateUser(req,cb){
        var res = {};
        console.log("In user login request:"+ JSON.stringify(req));

        User.findOne({ email: req.body.email })
            .then((user)=>{
                console.log(user);
                if(user){
                    user.comparePassword(req.body.password)
                        .then(result=>{
                            if(result===true){
                                res.code=201;
                                res.value={user:user};
                                cb(null,res);
                            }
                            else{
                                res.code = 400;
                                res.value = {error:"Password Incorrect!"};
                                cb(null,res);
                            }
                        })
                        .catch((error)=>{
                            res.code = 400;
                            res.value = error;
                            cb(null,res);
                        })
                }
                else{
                    res.code = 404;
                    res.value = {error:"Username Not found!"};
                    cb(null,res);
                }
            })
            .catch((error)=>{
                res.code = 400;
                res.value = error;
                cb(null,res);
            })
        // User.findOne({where: { email: req.body.email } })
        //     .then((user)=>{
        //         // console.log(user);
        //         user.validPassword(req.body.password)
        //             .then((result)=>{
        //                 // console.log("bcrypt"+result);
        //                 if(result===true){
        //                     var token = jwt.sign(
        //                         { id: user.id },
        //                         config.keys.secret,
        //                         { expiresIn: '1d' }
        //                     );
        //
        //                     res.json({ success: true, token: 'JWT ' + token ,user:user});
        //                 }
        //                 else{
        //                     res.status(400).send({error:"Password Incorrect!"});
        //                 }
        //             })
        //             .catch(error=>{
        //                 console.log(error);
        //                 res.status(400).send(error)
        //             });
        //     })
        //     .catch(error=> res.status(400).send({"error":"user not found"}));


    }
};