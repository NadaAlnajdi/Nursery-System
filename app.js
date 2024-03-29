const express = require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');
const bcrypt = require('bcrypt')
const cors=require('cors');
require('dotenv').config()

const teacherRouter=require("./Routes/teacherRoute")
const childRouter=require("./Routes/childRouter")
const classRouter=require("./Routes/classRouter")
const loginRouter=require("./Routes/loginRouter")
const authorizationMW= require('./middleWares/authenticationMW')
const teacherSchema =require("./model/teacherModel")
const PORT=process.env.PORT||8080;
const app = express();

mongoose.connect(process.env.DBURL)
.then(() => {
  console.log("DB Connected....");
  addAdmin()
  app.listen(PORT, () => {
    console.log("I am listening..........", PORT);
  });
  
})
.catch((error) => {
  console.log("DB Problem ..." + error);
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: false }));

app.use(loginRouter,authorizationMW,teacherRouter,childRouter,classRouter);




//first MW
app.use(morgan('dev'));

//Not Found MW
app.use((request, response)=>{
    response.status(404).json({data:"Not Found"});
})

//Error MW
app.use((Error,request, response,next)=>{
    response.status(500).json({data:`Error MW ${Error}`});

})

async function addAdmin() {
  try {
    const admin = await teacherSchema.findOne({ email: "nada@admin.com" });
    
    if (!admin) {
      const hashPassword = bcrypt.hashSync("Nada#2000",+process.env.saltRound)
      const newAdmin = new teacherSchema({
        _id:"1e9f9b9b9c9eb9d8a2d3c7b9",
        fullName: "nada",
        email: "nada@admin.com",
        password: hashPassword,
        role: "Admin"
      });
      
      await newAdmin.save();
      console.log("admin added successfully");
    }
  } catch (error) {
    console.log(error);
  }
}