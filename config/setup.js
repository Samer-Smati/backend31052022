const userSchema = require('../models/user.model');
const roleSchema = require('../models/role.model');
const bcrypt = require('bcrypt');


const init = async() =>{
    try {
        const roleIsEmpty = await roleSchema.find();
        if(roleIsEmpty.length == 0){
            await roleSchema.insertMany([{roleName:'admin'},{roleName:'gestionnaire'},{roleName:'user'}]);
            console.log('admin , gestionnaire and user created inside role collection')
        }
        const isAdmin = await roleSchema.findOne({roleName:'admin'});
        if(!isAdmin){
            const roleIsEmpty = await roleSchema.find();
            if(roleIsEmpty.length == 0){
                await roleSchema.insertMany([{roleName:'admin'},{roleName:'gestionnaire'},{roleName:'user'}]);
                console.log('admin , gestionnaire and user created inside role collection')
            }
        }
        const userIsAdmin = await userSchema.findOne({role:isAdmin._id})
        if(!userIsAdmin){
            const admin = new userSchema({
                firstname:'admin',
                lastname:'admin',
                email:'admin@admin.com',
                password:bcrypt.hashSync('123456789',10),
                role:isAdmin._id,
            })
            await admin.save();
            console.log('admin is created')
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = init