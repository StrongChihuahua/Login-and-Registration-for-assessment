const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../Schema/User');
const config = require('config');


module.exports = createUser = (req, res) => {
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

                            //sign token
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
