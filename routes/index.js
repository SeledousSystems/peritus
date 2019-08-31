var express = require('express');
var router = express.Router();

// Require our controller.
var CPDObject_controller = require('../controllers/CPDObjectController');


// GET home page.
// router.get('/', function(req, res) {
//   res.redirect('/catalog');
// });

router.get('/', CPDObject_controller.index);

router.post('/', CPDObject_controller.index_login_post);

router.get('/createCPD', CPDObject_controller.cpd_create_get);

router.post('/createCPD', CPDObject_controller.cpd_create_post);

// router.get('/modifyCPD', CPDObject_controller.cpd_modify_get);

// router.post('/modifyCPD', CPDObject_controller.cpd_modify_post);

module.exports = router;
