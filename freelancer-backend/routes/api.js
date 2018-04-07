var express = require('express');
var router = express.Router();
var profile = require('./profile');
var project = require('./project');
// router.get('/', function(req, res, next) {
//     res.send("dsad");
// });

//profile
router.use('/profile',profile);
router.use('/projects',project);

module.exports = router;