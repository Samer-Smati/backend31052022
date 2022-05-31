const userSchema = require('../models/user.model')
const roleSchema = require('../models/role.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.addUser = async(req,res) =>{
    const {email,password,role} = req.body;
    try {
        const userExist = await userSchema.findOne({email:email});
        if(userExist){
            return res.status(400).send({msg:'User already exist...'});
        }
        const user = new userSchema(req.body);
        const passwordHashed = bcrypt.hashSync(password,10);
        user.password = passwordHashed
        
        if(req.body.role){
            if(role != 'admin' || role != 'gestionnaire'){
                const ourRole = await roleSchema.findOne({roleName:'user'});
                user.role = ourRole._id 
            }
        }else{
            const ourRole = await roleSchema.findOne({roleName:'user'});
            user.role = ourRole._id 
        }
        const userID = {id:user._id}
        const token = await jwt.sign(userID, process.env.passwordToken);
        await user.save();
        return res.status(200).send({msg:'User added',token});
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}



exports.getAllUsers = async (req,res) =>{
    try {
        const users = await userSchema.find();
        if(users.length == 0){
            return res.status(400).send({msg:'collect user empty...'});
        }
        
        return res.status(200).send({users});
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}



exports.getOneUser = async(req,res) =>{
    const {id} = req.params;
    try {
        const user = await userSchema.findById(id);
        if(!user){
            return res.status(400).send({msg:'User not exist...'});
        }
        
        return res.status(200).send({user});
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}


exports.deleteOneUser = async(req,res) =>{
    const {id} = req.params;
    
    try {
        const user = await userSchema.findByIdAndDelete(id);
        if(!user){
            return res.status(400).send({msg:'User not exist...'});
        }
        return res.status(200).send({msg:'User deleted'});
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.updateOneUser = async(req,res) =>{
    const {id} = req.params;
    try {
        const user = await userSchema.findOneAndUpdate({_id:id},{$set:{...req.body}});
        if(!user){
            return res.status(400).send({msg:'User not exist...'});
        }
        const userUpdated = await userSchema.findById(id)
        return res.status(200).send({msg:'User updated',userUpdated});
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.login = async(req,res) =>{
    const {email,password} = req.body;
    
    try {
        const userExist = await userSchema.findOne({email:email});
        
        if(!userExist){
            return res.status(400).send({msg:'bad credentials'});
        }
       
        const passwordHashed = bcrypt.compareSync(password,userExist.password);
       
        if(!passwordHashed){
            return res.status(400).send({msg:'bad credentials'});
        }
        
        
        const userID = {id:userExist._id}
        const token = await jwt.sign(userID, process.env.passwordToken);
        
        return res.status(200).send({msg:'logged successfully',token});
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}