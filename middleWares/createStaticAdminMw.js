const teacherSchema = require("../model/teacherModel");
const bcrypt = require("bcrypt");

async function addAdmin() {
    try {
      const admin = await teacherSchema.findOne({ email: "nada@admin.com" });
  
      if (!admin) {
        const hashPassword = bcrypt.hashSync("Nada#2000", +process.env.saltRound);
        const newAdmin = new teacherSchema({
          _id: "1e9f9b9b9c9eb9d8a2d3c7b9",
          fullName: "nada",
          email: "nada@admin.com",
          password: hashPassword,
          role: "Admin",
        });
  
        await newAdmin.save();
        console.log("admin added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = addAdmin;