const passport = require('passport')
const LocalStrategy = require('./localStrategy')

passport.serializeUser((user, done) => {
    console.log('serialize'+user._id)
    console.log(user)
    done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
    console.log('Deserialize',id)
    done(null, id);
})

// ==== Register Strategies ====
passport.use(LocalStrategy)

module.exports = passport