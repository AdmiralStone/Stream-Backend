const {validationResult} = require('express-validator');
const db = require('../models');
const { use } = require('passport');
const { where } = require('sequelize');
const Profile = db.Profile;

//Fetch Profile Details
exports.getProfile = async (req,res)=>{
    try{
        const user = await Profile.findByPk(req.user.id,{
            attributes: {exclude:['password']}
        });

        if(!user){
            return res.status(404).json({msg:'Get Profile Failed: USER NOT FOUND'});
        }
        
        res.json(user);


    }catch(err){
        console.log(err);
        res.status(500).send('Server Error 1: PROFILE CONTROLLER');
    }
}

//Update Profile
exports.updateProfile = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullName, username, email, avatar} = req.body;

    try{
        let user = await Profile.findByPk(req.user.id);
        if(!user){
            return res.status(404).json({msg:'Update Profile Failed: USER NOT FOUND'});
        }

        //Check if username or email is already taken by user
        if(username && username !== user.username){
            const existingUsername = await Profile.findOne({where:{username}});
            if(existingUsername){
                return res.status(400).json({msg:'Update Profile Failed: USERNAME ALREADY TAKEN'});
            }
        }
        if(email && email !== user.email){
            const existingEmail = await Profile.findOne({where:{email}});
            if(existingEmail){
                return res.status(400).json({msg:'Update Profile Failed: EMAIL ALREADY TAKEN'});
            }
        }

        user.fullName = fullName || user.fullName;
        user.username = username || user.username;
        user.email = email || user.email;
        user.avatar = avatar || user.avatar;
        user.updatedAt = new Date();

        await user.save();
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error 2: PROFILE CONTROLLER')
    }
}