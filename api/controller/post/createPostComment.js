const Post = require('../../Schema/Post')
const User = require('../../Schema/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const socket = require('socket.io');
const express = require('express');
const app = express();



// const server = require('../../../server');
// const io = server.getIO;
// console.log(io);
//console.log(io);

// io.on('connection', (socket) => {
//     console.log('socket connection has been established', socket.id);
//     socket.emit('test', { msg: 'TEST1231233123'});
// });

module.exports = createPostComment = (req, res) => {

    //const io = res.locals['socketio'];
    //console.log(req.io);

    if(!req.body) {
        return res.status(400).json( { msg: 'Please make sure all required fields are filled out correctly'} );
    }
    
    try {
    jwt.verify(req.token, config.get('jwtSecret'), async (err, decodedToken) => {

        if(err) {
            return res.status(403).json( {msg: 'Forbidded. Authorization Denied!'} );
        }
        const user = await User.findById({_id: decodedToken._id}).exec();

        const comment = {
            post_id: req.params.id,
            comment_body: req.body.comment_body,
            author: user.username
        }

        try {
            const post = await Post.findById({_id: req.params.id}).exec();
        
            if(post) {
                //console.log(post);
                post.comments.push(comment);
                post.save()
                return res.json({msg: 'Comment added', post});
            } 
            return res.status(404).json({msg: 'Post not found'}); 
        } catch (err) {
            return res.status(403).json({msg: 'Error occured', errMsg: err})
        }


        //console.log(comment);

     })
    } catch(err) {
        return res.status(403).json({msg: 'Error occured', errMsg: err})
    }


    // User.findById({_id: decoded._id}).exec()
    //     .then(user => {
    //         const comment = {
    //             post_id: req.params.id,
    //             comment_body: req.body.comment_body,
    //             author: user.username
    //         }  
    //         Post.findById({_id: req.params.id}).exec()
    //         .then( post => {
    //             if(post) {
    //                 post.comments.push(comment);
    //                 post.save()
    //                     .then(() => {
    //                         res.json({msg: 'Comment added', post})
    //                     })
    //                     .catch(err => {
    //                         console.log('err')
    //                     })
                
    //             } else {
    //                 res.status(400).json({msg: 'Request failed'})
    //             }
    //         }).catch(err => console.log(err))

    //     }).catch( err => {
    //         console.log(err);
    //     })
}