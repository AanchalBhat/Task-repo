const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ENV = require("../config/env");
const User = require("../models/user");
const saltRounds = 12;

const userRegister = async (req, res ) => {
  // console.log(req.body);
  // console.log(req.file);
  try {
    let emailNotRegistered = await validateEmail(req.body.email);
    if (!emailNotRegistered) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    let password = await bcrypt.hash(req.body.password, saltRounds);

    if(!req.file){
      let newUser = new User({
        name : req.body.name,
        email : req.body.email,
        password : password,
        phone : req.body.phone,
        mobile : req.body.mobile,
        zipcode : req.body.zipcode,
        lat : req.body.lat,
        lang : req.body.lang
  
       

      });
      let saveNewUser = await newUser.save();

      let serializedUser = {
        _id: saveNewUser._id,
        name: saveNewUser.name,
        email: saveNewUser.email,
      };
  
      return res.status(201).json({
        message: "User created successfully",
        success: true,
        result: serializedUser,
      });


    }
    else{
      let newUser = new User({
        name : req.body.name,
        email : req.body.email,
        password : password,
        phone : req.body.phone,
        mobile : req.body.mobile,
        zipcode : req.body.zipcode,
        profilePic: req.file.path,
        lat : req.body.lat,
        lang : req.body.lang
  
       
      });

      let saveNewUser = await newUser.save();

      let serializedUser = {
        _id: saveNewUser._id,
        name: saveNewUser.name,
        email: saveNewUser.email,
      };
  
      return res.status(201).json({
        message: "User created successfully",
        success: true,
        result: serializedUser,
      });
    }




  } catch (err) {
    return res.status(500).json({
      message: "Unable to create you account",
      success: false,
    });
  }
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    // console.log(req.body);

    const user = await User.findOne({ email });
    // console.log(user)
    if (!user) {
      return res.status(404).json({
        message: "User not exists",
        success: false,
      });
    }

    //check password
    let isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch);

    if (isMatch) {
      let payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        mobile: user.mobile,
        zipcode: user.zipcode,
        profilePic: user.profilePic,
        lat: user.lat,
        lang: user.lang,
      };
      let token = await jwt.sign(payload, ENV.JWT_KEY, { expiresIn: "7days" });

      return res.status(200).json({
        message: "You are loggedin successfully",
        success: true,
        _id : user._id,
        token: token,
        profilePic: "http://localhost:"+ ENV.PORT +"/" + user.profilePic,
      });
    } else {
      return res.status(401).json({
        message: "Incorrect credentials",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Unable to login",
      success: false,
    });
  }
};



const serializeUser = async (req , res) => {

  try {
      let user = await req.user;
      if(user){
          return res.status(200).json(
              {
                  message : "Successfully fetched your profile data",
                  success : true,
                  _id: user._id,                   
                  name : user.name,
                  email: user.email,
                  phone : user.phone,
                  mobile : user.mobile,
                  zipcode : user.zipcode,
                  profilePic : "http://localhost:"+ ENV.PORT +"/" + user.profilePic,
                  lat : user.lat,
                  lang : user.lang,
                  updatedAt: user.updatedAt,
                  createdAt: user.createdAt,
              }
          ) 
      }
      else{
          return res.status(404).json({
              message : "Unable to fetch your profile data",
              success : false
          })
      }

  }

  catch(err){
      return res.status(500).json({
          message : "server err",
          success : false,
          error : err 
      })
  }

};


const updateProfile = async(req, res) => {
  const id = req.params.userId;


  let newHash = await bcrypt.hash(req.body.password , 12 );
  
    let updatedData = {
      name : req.body.name,
      email : req.body.email,
      password : newHash,
      phone: req.body.phone,
      mobile : req.body.mobile,
      zipcode : req.body.zipcode,
      profilePic : req.file.path

    }

    await User.updateOne({_id : id } , updatedData );
    let user = await User.findOne({_id : id});
  
    let serializedUpdatedProfile = {

      message : "Successfully fetched your profile data",
      success : true,
      _id: user._id,                   
      name : user.name,
      email: user.email,
      phone : user.phone,
      mobile : user.mobile,
      zipcode : user.zipcode,
      profilePic : "http://localhost:"+ ENV.PORT +"/" + user.profilePic,
      lat : user.lat,
      lang : user.lang,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    }


    return res.status(200).json({
      message : "Your password is successfully changed.",
      success : true,
      result : serializedUpdatedProfile
  });
}



module.exports = {
  userRegister,
  userLogin,
  serializeUser,
  updateProfile,
};
