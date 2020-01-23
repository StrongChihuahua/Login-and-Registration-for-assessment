const Post = require('../../Schema/Post')
const User = require('../../Schema/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = createPost = (req, res) => {
    if(!req.body.title || !req.body.body) {
        return res.status(400).json( { msg: 'Please make sure all required fields are filled out correctly'} );
    }


    try {
    jwt.verify(req.token, config.get('jwtSecret'), async (err, decodedToken) => {
        if(err) {
            return res.status(403).json( {msg: 'Forbidded. Authorization Denied!'} );
       } 
        const user = await User.findById({_id: decodedToken._id}).exec()
        if(user) {
           const newPost = new Post ({
               _id: new mongoose.Types.ObjectId(),
               title: req.body.title,
               body: req.body.body,
               comments: [],
               post_author: user.username
           });

          let post = await newPost.save()
          if(post) return res.json({msg: 'Post Created', Post: post});
          return res.status(500).json({msg: 'Request failed'})
       } else {
           return res.status(403).json({errMsg: 'Invalid Author ID'})
       }
     })
    } catch (err) {
        return res.status(403).json({msg: 'Invalid Author ID', errMsg: err})
    }
    
    // User.findById({_id: req.params.id})
    //     .exec()
    //     .then( user => {
    //         if(user) {
    //             const newPost = new Post ({
    //                 _id: new mongoose.Types.ObjectId(),
    //                 title : req.body.title,
    //                 body : req.body.body,
    //                 comments: [],
    //                 post_author : user.username
    //             });

    //             newPost.save()
    //                    .then(post => {
    //                        if(!post) {
    //                            return res.status(400).json({msg: 'Request failed'})
    //                        } else {
    //                            return res.json({msg: 'Post Created', Post: post})
    //                        }
    //                    })
    //                    .catch(err => {
    //                        res.status(400).json({errMsg: err})
    //                    })
    //         } else {
    //             return res.status(400).json({errMsg: 'Invalid Author ID'})
    //         }
    //     })
    //     .catch( () => {
    //         res.status(400).json({errMsg: 'Invalid Author ID'})
    //     })


       
}