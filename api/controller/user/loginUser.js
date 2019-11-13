const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../Schema/User');
const config = require('config');



module.exports = logInUser = (req, res) => {
    
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
                            });
                    })
            })      
}
