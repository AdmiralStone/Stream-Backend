const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { where } = require('sequelize');
const Profile = db.Profile;

exports.signup = async (req,res)=>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullName, username, email,password} = req.body;

    try{
        let dbUsername = await Profile.findOne({where:{username}});
        if(dbUsername){
            return res.status(400).json({msg:'Signup Failed: USERNAME ALREADY EXISTS'});
        }

        let dbEmail = await Profile.findOne({where:{email}});
        if(dbEmail){
            return res.status(400).json({msg:'Signup Failed: EMAIL ALREADY EXISTS'});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        user = await Profile.create({
            fullName,
            username,
            email,
            password: hashedPassword,
            active: true,
            createdAt:new Date(),
            updatedAt: new Date()

        });

        const payload = {
            user:{
                id:user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:'1h'},
            (err,token)=>{
                if(err) throw err;
                res.json({token});
            }
        );        
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error 1: SIGNUP CONTROLLER');
    }
};

exports.login = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    try{
        let user = await Profile.findOne({where:{email}});
        if(!user){
            return res.status(400).json({msg:'Login Failed: EMAIL NOT FOUND'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg:'Login Failed: INVALID CREDENTIALS'});
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: '1h'},
            (err,token) =>{
                if(err)throw err;
                res.json({token});
            }
        );
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error 2: LOGIN CONTROLLER')
    }
}