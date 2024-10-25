
const config = require("../config/auth.config.js");
const User = require("../models/User");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const randomString = require('../utils/randomString');


/**
 * REGISTER TEACHER
 * For creating a new teacher or registering a new teacher
 * @param {string} username this is the name of the teacher
 * @param {string} email this is the email of the teacher
 * @param {password} this is the teacher's password
 * @return {Object} this will return an object after registration containing the success message
 **/    
exports.signup = async (req, res) => {
    console.log("User Registration");
    console.log('BODY: ', req.body);
    let data = {
      username: req.body.username,
      email: req.body.email,  
      password: bcrypt.hashSync(req.body.password, 8),
      account_type: req.body.account_type,
    };

   
    if(req.body.account_type == 'school') {
      let code = randomString.randomValueHex(6);
      data.school_code = `${data.username}-${code}`
    } 

    const user = new User(data);

    user.save((err) => {
      if (err) {
        console.log(err)
        res.status(500).send({ message: err });
        return;
      }
      res.send({
        message:
          "Registered successfully!",
      });
  
    });
  };
  
  exports.signin = (req, res) => {
    console.log("#####login request#########", req.body);

    User.findOne({
      email: req.body.email,
    }).then(user => {
      
      if (!user) {
        return res.status(404).send({ message: "account Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Email or Password!",
        });
      }
      console.log('USER OBJ', user);
      var token = { id: user._id, email: user.email, username: user.username, role: user.account_type, createdAt: user.createdAt }
  
      res.status(200).send({
        data: token,
      });
    }).catch(err  => {
        res.status(500).send({ message: err });
    })
  };


  exports.updateUser = async (req,res) => {
    console.log("REQUEST GOT HERE")
    
    try {
      let userId = req.userId;

      let user = await User.findOne({_id: userId});
     
      if(!user) {
        return res.status(404).send({message: "User not found"});
      }

      let imgUrl = req.body.imageUrl;

      user.imageUrl = imgUrl;

      await user.save();

      return res.status(200).send({message: "User profile pic added", user: user});
    } catch (error) {
      return res.status(500).send({error: error});
    }
  }


