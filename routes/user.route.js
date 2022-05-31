const express = require('express');


const userRoutes = express.Router();

const {addUser,getAllUsers,getOneUser,deleteOneUser,updateOneUser,login} = require('../controllers/user.controller')
const {isAuth} = require('../middlewares/isAuth')
const {registerValidator,Validation} = require('../middlewares/validator')
userRoutes.post('/addUser',registerValidator,Validation,addUser);
userRoutes.post('/login',login);
userRoutes.get('/',getAllUsers);
userRoutes.get('/currentUser',isAuth,(req,res)=>res.send({user:req.user}));
userRoutes.get('/:id',getOneUser);
userRoutes.delete('/:id',deleteOneUser);
userRoutes.put('/update/:id',updateOneUser);





module.exports = userRoutes;