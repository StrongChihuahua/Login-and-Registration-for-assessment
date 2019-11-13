const express = require('express');
const router = express.Router();

//controller
const createUser = require('../controller/user/createUser');
const logInUser = require('../controller/user/loginUser');
const getUserPayload = require('../controller/user/getUserPayload');
const updateUser = require('../controller/user/updateUser');

//middle
const verifyToken = require('../controller/middeware/verifyToken')


//Methods

//Create user
router.post('/create', createUser);

//logInUser
router.post('/auth', logInUser);

//LogInUser Payload
router.get('/profile', verifyToken, getUserPayload);

//Update User
router.put('/update/:id', verifyToken, updateUser);

module.exports = router;
