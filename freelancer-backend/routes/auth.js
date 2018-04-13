const express = require('express');
const validator = require('validator');
const usersController = require('../controllers').users;
const router = new express.Router();
const passport = require('../passport');

function validateSignUp(data){

    let isValid=true;
    let errors={};

    if(!data || !validator.isEmail(data.email)){
        isValid=false;
        errors.email='Email Required in correct format';
    }


    if(!data || !data.password.trim().length<6){
        isValid=false;
        errors.email='Password needs to be atleast 6 characters long';
    }

    if(!data ||  !data.name.trim().length===0){
        isValid=false;
        errors.email='Name required';
    }

    return {
        success: isValid,
        errors
    };


}


function validateLoginForm(data) {
    let isValid=true;
    let errors={};

    if (!data || data.email.trim().length === 0) {
        isValid = false;
        errors.email = 'Email Required';
    }

    if (!data || data.password.trim().length === 0) {
        isValid = false;
        errors.password = 'Please provide your password.';
    }



    return {
        success: isValid,
        errors
    };
}

router.post('/signup',usersController.create);

// router.post('/signup', (req, res) => {
//     let validation = validateSignupForm(req.body);
//     if (!validation.success) {
//         return res.status(400).json({
//             success: false,
//             errors: validationResult.errors
//         });
//     }
//     else{
//
//     }
// });

router.post('/login',passport.authenticate('local'),usersController.validateUser);

// router.post('/login', (req, res) => {
//     const validation = validateLoginForm(req.body);
//     if (!validation.success) {
//
//         return res.status(400).json({
//             success: false,
//             errors: validation.errors
//         });
//     }
//
//     return res.status(200).end();
// });

router.post('/logout', (req, res) => {
    if (req.user) {
        req.session.destroy()
        res.clearCookie('connect.sid') // clean up!
        return res.json({ message: 'logging you out' })
    } else {
        return res.json({ message: 'no user to log out!' })
    }
})


module.exports = router;