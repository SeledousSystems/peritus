var CPDObject = require('../models/CPDObject');

const {
    body,
    validationResult
} = require('express-validator');
const {
    sanitizeBody
} = require('express-validator');

var async = require('async');

exports.index = function (req, res) {

    console.log("im here");
    //get all the CPD Objects
    CPDObject.find().exec(function (err, list_CPDObjects) {
        if (err) {
            return next(err);
        }
        //successful so render
        //render the index page
        res.render('index', {
            title: 'Welcome to Peritus',
            error: err,
            data: list_CPDObjects
        })

    })
}