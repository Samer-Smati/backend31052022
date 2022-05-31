const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    roleName:{type:String,required:true},
})

module.exports = mongoose.model('Role',userSchema);