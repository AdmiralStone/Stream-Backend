const { where } = require('sequelize');
const db = require('../models');
const { use } = require('passport');
const Follow = db.Follow;
const Profile = db.Profile;

//Follow a user
exports.follow = async (req,res)=>{
    try{
        
        const {username} = req.body;
        const following = await Profile.findOne({where:{username}});
        if(!following){
            return res.status(404).json({msg:'Follow Failed: USER NOT FOUND'});
        }

        const follow = await Follow.create({
            followerId: req.user.id,
            followingId: following.id
        });

        res.json({follow});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error 1: FOLLOW CONTROLLER');
    }
}

//Unfollow User
exports.unfollow = async (req,res) =>{
    try{
        const { username } = req.body;
        const following = await Profile.findOne({ where: { username } });
        if (!following) {
          return res.status(404).json({ msg:'Unfollow Failed: USER NOT FOUND'});
        }

        const follow = await Follow.findOne({
            where:{
                followerId: req.user.id,
                followingId: following.id

            }
        });
        if (!follow) {
            return res.status(404).json({ msg:'Unfollow Failed: FOLLOW RECORD NOT FOUND'});
          }
        

        await follow.destroy();
        res.json({msg:'Unfollowed successfully'});
        
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error 2: FOLLOW CONTROLLER');
    }
}