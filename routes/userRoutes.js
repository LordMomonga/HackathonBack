
const express = require('express');
const userController = require('../controllers/userController');
const verifyMidleware = require('../midlewares/index');
const tokenMidleWare = require("../midlewares/authjwt");

const userRouter = express.Router();

// REGISTER TEACHERS ROUTES HERE

/**
 * For creating a new teacher or registering a new teacher
 * @api {post} request.
 * @api {Endpoint} /user/signup
 * 
 * @apiSuccess (201) {Object} data created teacher and message
 * @apiVersion 1.1.0
 * 
 **/
userRouter.post("/user/signup",[verifyMidleware.verifySignUp.checkDuplicateUsernameOrEmail], userController.signup);


/**
 * For teacher login
 * @api {post} request.
 * @api {Endpoint} /user/login
 * 
 * @apiSuccess (200) {Object} token, username, email, role, id, status
 * @apiPermission Teacher
 * @apiVersion 1.1.0
 **/
userRouter.post("/user/login", userController.signin);



userRouter.post("/user/update",[tokenMidleWare.verifyToken], userController.updateUser);



module.exports = userRouter;