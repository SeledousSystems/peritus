var express = require('express');
var router = express.Router();

// Require our controllers.
var CPDObject_controller = require('../controllers/CPDObjectController');

//home page
router.get('/', CPDObject_controller.index);

//Get Request for creating a CPDObject
router.get('/create', CPDObject_controller.create_get);

//POST request for creating a CPDObject
router.post('/create', CPDObject_controller.create_post);

//GET request for updating a CPDObject
router.get('/:id/update', CPDObject_controller.update_get);

//POST request for updating a CPDObject
router.post('/:id/update', CPDObject_controller.update_post);

//GET request for deleting a CPDObject
router.get('/:id/delete', CPDObject_controller.update_get);

//POST request for deleting a CPDObject
router.post('/:id/delete', CPDObject_controller.update_post);
