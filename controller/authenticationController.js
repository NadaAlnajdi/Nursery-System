const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
require('dotenv').config()

const teacherSchema = require("../model/teacherModel");

exports.login = (request, response, next) => {
  teacherSchema
    .findOne({
      email: request.body.email,
    })
    .then((data) => {
      if (!data) {
        throw new Error("Not Authenticated");
      }
      const isCorrectPass = bcrypt.compareSync(request.body.password,data.password)
      if(!isCorrectPass){
        throw new Error("wrong password");
      }
      
      let token = jwt.sign(
        {
          _id: data._id,
          role: data.role,
        },
        process.env.SECRETKEY,
        { expiresIn: "1hr" }
      );
      response.json({ data: "Authenticated", token });
    })
    .catch((error) => next(error));
};
