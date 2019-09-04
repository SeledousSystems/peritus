var CPDObject = require('../models/CPDObject');
var User = require('../models/User');

const {
    body,
    validationResult
} = require('express-validator');
const {
    sanitizeBody
} = require('express-validator');

var async = require('async');

//home function
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
            user: null,
            CPD_list: list_CPDObjects
        });

    });

};

//home post function (login user)
exports.index_login_post = function (req, res) {

    console.log("user Login attempt");
    console.log(req.body);
    //get all the CPD Objects
    async.parallel({
        user: function (callback) {
            User.find({}, 'email').populate('CPDObject').exec(callback);
        },
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        console.log(results.user);
        // Successful, so render.
        res.render('index', {
            title: 'Welcome to Peritus',
            error: err,
            user: req.body.UserEmail,
            CPD_list: results.user.CPDObjects
        });
    });

};

// Display cpd create form on GET.
exports.cpd_create_get = function (req, res, next) {

    // get the user from the id and pass to create page
    async.parallel({
        user: function (callback) {
            User.find({}, 'req.params.id').exec(callback);
        },
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        res.render('createCPD', {
            title: 'Create your CPD Activity',
            user: results.user,
        });
    });

};

// Handle CPD create on POST.
exports.cpd_create_post = [
    // Validate fields.
    body('title', 'Title must not be empty.').isLength({
        min: 1
    }).trim(),
    body('twaves', 'Twaves must not be selected.').isLength({
        min: 1
    }).trim(),
    body('date_commenced', 'Date Commenced must not be empty.').isLength({
        min: 1
    }).trim(),
    body('date_completed').trim(),
    body('status', 'Status must be selected').isLength({
        min: 1
    }).trim(),

    // Sanitize fields (using wildcard).
    sanitizeBody('*').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a CPD Activity object with escaped and trimmed data.
        var activity = new CPDObject({
            title: req.body.title,
            twaves: req.body.twaves,
            date_commenced: req.body.date_commenced,
            date_completed: req.body.date_completed,
            status: req.body.status,
            notes: req.body.notes
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            //in the view need to fill in fields and display errors so user can correct
            res.render('createCPD', {
                title: 'Create CPD Actvitiy',
                CPDactivity: activity,
                errors: errors.array()
            });

            return;
        } else {
            // Data from form is valid. Save the activity
            activity.save(function (err) {
                if (err) {
                    return next(err);
                }
                //save the activty against the users array
                user.CPDObjects.push(activity);

                //successful - redirect to home page record.
                res.render('index', {
                    title: 'Welcome to Peterus',
                    user: user
                });
            });
        }
    }
];

exports.user_create_get = function (req, res, next) {
    res.render('createUser', {
        title: 'Create a Peretus account',
    });
}

exports.user_create_post = function (req, res, next) {

    console.log("validating"),
        // Validate fields.
        body('email', 'Title must not be empty.').isLength({
            min: 1
        }).trim(),
        body('fname', 'First Name must not be empty.').isLength({
            min: 1
        }).trim(),
        body('lname', 'Last Name must not be empty.').isLength({
            min: 1
        }).trim(),

        console.log("validated"),
        //do something else if validating with FB or google or github

        // Sanitize fields (using wildcard).
        sanitizeBody('*').escape(),

        console.log("sanitised"),

        // Process request after validation and sanitization.

        console.log("processing");
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a user object with escaped and trimmed data.
    var user = new User({
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
    });

    console.log(user);

    if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
        console.log("errors");
        res.render('createUser', {
            title: 'Create a Peretus account',
            email: req.body.email,
            fname: req.body.fname,
            lname: req.body.lname,
        });
        console.log(errors);
        return;

    } else {
        // Data from form is valid. Save user
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            console.log('user.id');
            console.log(user.id);
            //successful - redirect to user main page (cookies?).
            res.render('index', {
                title: 'Welcome to Peretus',
                user: user
            });
        });
    }

};