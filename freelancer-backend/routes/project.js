var express = require('express');
var router = express.Router();
var projectsController = require('../controllers/projects');
var projectUpload = require('../config/multerConfig').projectMulter;

router.get('/:id', projectsController.retrieve);
router.post('/:id/bid', projectsController.bid);
router.post('/:id/hire', projectsController.hire);

router.post('/', projectUpload.single('file'),projectsController.create);
router.get('/all/bidded', projectsController.retrieveAllBidded);
router.get('/all/created', projectsController.retrieveAllCreated);
router.get('/all/open', projectsController.retrieveAll);
router.get('/all/relevant', projectsController.retrieveAllRelevant);

module.exports = router;
