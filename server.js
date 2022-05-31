const express = require('express');
const connectToMyDataBase = require('./config/connectDb')
const init = require('./config/setup');
const userRouter = require('./routes/user.route')
const app = express();
require('dotenv').config()
 
app.use(express.json()); 

app.use('/user/',userRouter);

const PORT = process.env.PORT || 5000;
connectToMyDataBase()
init() 
app.listen(PORT,(err)=>{ 
    if(err) throw console.log(err);
    console.log(`listen to port ${PORT}`);
})