const express = require('express');
const router = express.Router();

//controller
const createUser = require('../controller/createUser');
const logInUser = require('../controller/loginUser');
const getUserPayload = require('../controller/getUserPayload');
const updateUser = require('../controller/updateUser');

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
