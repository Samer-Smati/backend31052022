
const userSchema = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.isAuth = async (req,res,next) =>{
    const token = req.header('Authorization');
   
    try {
        if(!token){
            return res.status(400).send({msg:'you don\'t have access'})
        }
        const decoded = await jwt.verify(token, process.env.passwordToken);
        if(!decoded){
            return res.status(400).send({msg:'you don\'t have access'})
        }
        const user = await userSchema.findById(decoded.id);
        if(!user){
            return res.status(400).send({msg:'you don\'t have access'})
        }
        req.user = user
        next();
    } catch (error) {
        return res.status(500).send({msg:error});
    }
}