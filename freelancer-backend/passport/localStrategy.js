const LocalStrategy = require('passport-local').Strategy
const kafka = require('../kafka/client');

const strategy = new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField:"email"
    },
    function(req,username, password, done) {
        // User.findOne({ 'local.username': username }, (err, userMatch) => {
        //     if (err) {
        //         return done(err)
        //     }
        //     if (!userMatch) {
        //         return done(null, false, { message: 'Incorrect username' })
        //     }
        //     if (!userMatch.checkPassword(password)) {
        //         return done(null, false, { message: 'Incorrect password' })
        //     }
        //     return done(null, userMatch)
        // })

        kafka.make_request('login_topic',{body:req.body}, function(err,results){
            console.log('login result');
            console.log(results);
            if(err){
                console.log(err);
                done(err,{});
            }
            else
            {
                if(results.code == 201){
                    done(null,results.value.user);
                }
                else {
                    done(null,false);
                }

            }
        });


    }
)

module.exports = strategy