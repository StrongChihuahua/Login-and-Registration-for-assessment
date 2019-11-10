const User = require('../Schema/User');
const hashPassword = require('./helper-controller');


module.exports = updateUser = (req, res) => {
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
