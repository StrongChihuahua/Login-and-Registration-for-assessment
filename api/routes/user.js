const express = require('express');
const router = express.Router();
const ControllerRoutes = require('../controller/controller');



const controller = new ControllerRoutes();

//Methods

//Create user
router.post('/create', controller.createUser);

//logInUser
router.post('/auth', controller.logInUser);

//LogInUser Payload
router.get('/profile', controller.verifyToken, controller.getUserPayload);

//Update User
router.put('/update/:id', controller.verifyToken, controller.updateUser);




module.exports = router;
