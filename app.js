const express = require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');
const cors=require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json');

require('dotenv').config()
const teacherRouter=require("./Routes/teacherRoute")
const childRouter=require("./Routes/childRouter")
const classRouter=require("./Routes/classRouter")
const loginRouter=require("./Routes/loginRouter")
const authorizationMW= require('./middleWares/authenticationMW')
const createAdmin = require("./middleWares/createStaticAdminMw")
const PORT=process.env.PORT||8080;
const app = express();

mongoose
  .connect(process.env.DBURL)
  .then(async() => {
    console.log("DB Connected....");
    await createAdmin();
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


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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

