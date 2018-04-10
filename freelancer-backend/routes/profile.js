var express = require('express');
var router = express.Router();
var profilesController = require('../controllers/profiles');
var profileUpload=require('../config/multerConfig').profileMulter;

router.get('/:id', profilesController.retrieve);
router.put('/', profileUpload.single('image'),profilesController.update);
router.post('/addmoney',profilesController.addMoney);
router.post('/withdrawmoney',profilesController.withdrawMoney);

module.exports = router;
