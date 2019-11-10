const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Schema/User');
const config = require('config');
const hashPassword = require('./helper-controller');


class ControllerRoutes {

    createUser(req, res) {
        //Validate the fields
        if(!req.body.first_name || !req.body.last_name || !req.body.username || !req.body.password ) {
            return res.status(400).json( { msg: 'Please make sure all required fields are filled out correctly'} );
        }

        //Validate the username if already exist
        User
            .findOne({ username: req.body.username})
            .then(user => {
                
                //Additional Validation
                if(user) return res.status(400).json( {msg: 'Username is already existing'} );
                if(req.body.password.length < 6) return res.status(400).json( { msg: 'Password must be atleast 6 characters long'} );
                if(req.body.username.length < 4) return res.status(400).json( { msg: 'Username must be atleast 4 characters long'} );
        
                //if dont exist then
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
    
                        if(err) console.log(err);
    
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                if(!user) res.status(400).json({ msg: `Bad request. Creation failed`  });
    
    
                                jwt.sign({
                                    _id: user._id, 
                                    first_name: user.first_name,
                                    last_name: user.last_name,
                                    username: user.username
                                    }, 
                                    config.get('jwtSecret'),
                                    (err, token) => {
                                        if(err) console.log(err);
            
                                        res.json({
                                            //respone with token
                                            token: token,
                                            msg: 'Created successfully!'
                                        })
                                    }
                                    );
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
                });
        })
    }

    logInUser(req, res) {
        //Validate fields
        if(!req.body.username || !req.body.password) {
            return res.status(400).json( { msg: 'Please complete all required fields.'} );
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
                            _id: user._id, 
                            first_name: user.first_name,
                            last_name: user.last_name,
                            username: user.username
                            }, 
                            config.get('jwtSecret'),
                            (err, token) => {
                                if(err) console.log(err);
    
                                res.json({
                                    //respone with token
                                    token: token
                                })
                            }
                            );
    
                    })
            })
    
    }


    getUserPayload(req, res) {
        jwt.verify(req.token, config.get('jwtSecret'), (err, userData) => {
            if(err) {
                res.status(403).json( {msg: 'Forbidded. Authorization Denied!'} );
            } else {
                User.findById({ _id: userData._id})
                    .then(user => {
                        if(user) {
                        res.json(
                        {
                             _id: user.id,
                            username: user.username,
                            first_name: user.first_name,
                            last_name: user.last_name
                        }
                     );
                 }   
            })
        }
    });
    
  }

    verifyToken(req, res, next)  {
        const token = req.headers['auth-token']
        if(!token){
            res.status(403).json({
                msg: 'Forbidden. Authorization Denied!'
            })
        } else {
            req.token = token;
            next();
        }
    }

    updateUser(req, res) {

        const bodyLength = Object.keys(req.body).length;
        if(bodyLength !== 0) {
            const id = req.params.id;
            if(req.body.password && req.body.password.length < 8) {
                res.status(400).json({msg: 'Password must be atleast 8 characters long'});
            } else if(req.body.username && req.body.username.length < 4 ){
                res.status(400).json({msg: 'Username must be atleast 4 characters long'});
            } else {
                //validate username if exsisting
                User.findOne( {username: req.body.username} )
                    .then( user => {
                        if(user)  {
                            return res.status(400).json({msg: 'Username is already existing'});
                        } else {
                            req.body.password = hashPassword(req.body.password);
                            User.findByIdAndUpdate({ _id: id}, req.body)
                                .exec()
                                .then( user => {
                                    res.json({msg: 'Updated Successfully', by: user.username});
                            }) 
                       }
                 })
                    .catch(() => {
                        if(req.body.password) {
                            req.body.password = hashPassword(req.body.password);
                        } else{
                        
                        User.findByIdAndUpdate({ _id: id}, req.body)
                            .exec()
                            .then( user => {
                                res.json({msg: 'Updated Successfully', by: user.username});
                        })
                    }  
    
                });
               
            }

        } else {
            res.status(400).json({msg: 'No changes found'})
        }
    }
}




module.exports = ControllerRoutes;
