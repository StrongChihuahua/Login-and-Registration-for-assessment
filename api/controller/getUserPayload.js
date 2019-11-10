const jwt = require('jsonwebtoken');
const User = require('../Schema/User');
const config = require('config');



module.exports = getUserPayload = (req, res) => {
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