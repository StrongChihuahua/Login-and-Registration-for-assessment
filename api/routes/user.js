const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Schema/User');
const config = require('config');


//Get all user
router.get('/', (req, res) => {
    res.send('GET ALL USERS');
});


//Create user
router.post('/create', (req, res) => {

    //Validate the fields
    if(!req.body.first_name || !req.body.last_name || !req.body.username || !req.body.password) {
        return res.status(400).json( { msg: 'Please fill up all fields'} );
    }

    //Validate the username if already exist
    User
        .findOne({ username: req.body.username})
        .then(user => {
            if(user) res.status(400).json( {msg: 'Username is already exist'} );

            const newUser = new User ({
                _id: new mongoose.Types.ObjectId(),
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                username : req.body.username,
                password : req.body.password
            });

            //Hash password from the body and save it to db
            bcrypt.genSalt(10, (err, salt) =>{
                if(err) console.log(err);
                bcrypt.hash(req.body.password, salt, (err, hash) => {

                    if(err) console.log(`${err}: here in line 40 (bcrypt)`);

                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            if(!user) res.status(400).json({ msg: `Bad request. Creation failed`  });
                            res.json( {msg: 'Created successfully!'} )
                        })
                        .catch(err => {
                            console.log(`${err}: here in line 52 (reject save)`);
                        });
                });
            });

        })

});


router.get('/profile', (req, res, next) => {
    const token = req.headers['auth-token'];
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzI2YTFhOWRlNThiNWQ3ODk2YTg5YiIsImZpcnN0X25hbWUiOiJNYXJrIEpheXZlZSIsImxhc3RfbmFtZSI6IlBheiIsInVzZXJuYW1lIjoiamliZWhqaWJlaCIsImlhdCI6MTU3MzAyODA1MiwiZXhwIjoxNTczMDM4ODUyfQ.S-EO4CAsgrNdQGqKCalQ-AwBsf0GsxO5Kx25GXwZf9E';
    
    //check if token is on the headers of the request
 
        // if(!token) {
        //     res.status(400).json({ msg: 'Auth denied, no token'})
        // }
    

    try{
    //Return the user credentials/info
    var decoded = jwt.verify(token, config.get('jwtSecret'));

    User
        .findById( {_id: decoded.id} )
        .then(user => {
            res.json( {
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username
            } );
        })
        
    } catch(e) {
        res.status(401).json( {msg: 'Authorization denied. Invalid token or token is missing'} );
    }
})

/*

AUTH =========================================================================================

*/



router.post('/auth', (req, res) => {

    //Validate fields
    if(!req.body.username || !req.body.password) {
        return res.status(400).json( { msg: 'Please fill up all fields'} );
    }

    //Check username if existing
    User
        .findOne({username: req.body.username})
        .then(user => {
            if(!user) return res.status(400).json( {msg: `User doesn't exist`} );

            //compare hashed between password and req.body password
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(404).json( {msg: 'Invalid Password!'} );

                    //Generate token
                    jwt.sign({
                        id: user.id, 
                        first_name: user.first_name,
                        last_name: user.last_name,
                        username: user.username
                        }, 
                        config.get('jwtSecret'),
                        { expiresIn: 10800 },
                        (err, token) => {
                            if(err) console.log(err);

                            res.json({
                                token: token,
                                user: {
                                    id: user._id,
                                    first_name: user.first_name,
                                    last_name: user.last_name,
                                    username: user.username
                                }
                            })
                        }
                        );

                })
        })

});







module.exports = router;
