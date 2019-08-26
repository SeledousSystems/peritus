var express = require('express');
var router = express.Router();

// Require our controller.
var CPDObject_controller = require('../controllers/CPDObjectController');


// GET home page.
// router.get('/', function(req, res) {
//   res.redirect('/catalog');
// });

router.get('/', CPDObject_controller.index);

module.exports = router;
