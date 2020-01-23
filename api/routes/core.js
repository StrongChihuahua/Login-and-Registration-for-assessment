const express = require('express');
const app = express();
const router = express.Router();
const socket = require('socket.io');

//controller - user
const createUser = require('../controller/user/createUser');
const logInUser = require('../controller/user/loginUser');
const getUserPayload = require('../controller/user/getUserPayload');
const updateUser = require('../controller/user/updateUser');

//controller - post
const createPost = require('../controller/post/createPost');
const createPostComment = require('../controller/post/createPostComment');
const getPosts = require('../controller/post/getPosts');
const getPost = require('../controller/post/getPost');
const getPostComments = require('../controller/post/getPostComments');

//helper
const verifyToken = require('../controller/middeware/verifyToken')




//Methods

// USER //

//Create user
router.post('/create', createUser);

//logInUser
router.post('/auth', logInUser);

//LogInUser Payload
router.get('/profile', verifyToken, getUserPayload);

//Update User
router.put('/update/:id', verifyToken, updateUser);




// POST //

//Create post
router.post('/create/post', verifyToken, createPost);

//Insert comment/s
router.patch('/post/:id/create/comment', [verifyToken], createPostComment);

//Get all post payload
router.get('/posts', getPosts)

//Get post payload
router.get('/post/:id', getPost);

//Get post comment/s payload
router.get('/post/:id/comments', getPostComments)

module.exports = router;
