const notifier = require('node-notifier');
const db = require('../models');
const { where } = require('sequelize');
const Follow = db.Follow;
const Profile = db.Profile;

exports.notifyFollowers = async (req,res) =>{
    try{

        const user = await Profile.findByPk(req.user.id);
        if(!user){
            return res.status(404).json({msg:'Notification Failed: USER NOT FOUND'});
        }

        const followers = await Follow.findAll({where:{followingId:req.user.id}});
        
        const followerIds = followers.map(follow => follow.followerId);

        const followerProfiles = await Profile.findAll({where:{id:followerIds}})

        followerProfiles.forEach(follower =>{
            notifier.notify({
                title:'Live Stream Started',
                message:`${user.username} has started a live stream!`,
                wait:true
            })

            //We can integrate an email servuce here to send emails to users
        })

        res.json({msg: 'Notification sent'});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error 1: NOTIFICATION CONTROLLER");
    }
}