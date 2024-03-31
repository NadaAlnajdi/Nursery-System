const express= require("express");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router=express.Router();
const teacherController=require("../controller/teacherController");
const teachValidation=require("../middleWares/Validations/teacherValidation")
const validationResult=require("../middleWares/Validations/validationResult")
const uploadMW = require("../middleWares/uploadMW")

const {isAdmin , isTeacher} = require("../middleWares/authenticationMW")



router.get("/teachers/supervisors",isAdmin,teacherController.getAllSupervisors)

router.route("/teachers")
.get(isAdmin,teacherController.getAllTeachers)
.post(uploadMW.single('image'),isAdmin,teachValidation.insertValidator,validationResult,teacherController.addTeacher)
.patch(uploadMW.single('image'),teachValidation.UpdateValidator,validationResult,teacherController.UpdateTeacherData)
.delete(teacherController.daleteSpecifiedTeacher)

router.get("/teachers/:id",teacherController.getTeacherByID)

router.patch("/teachers/changePass",teachValidation.changePassword,validationResult,teacherController.changePassword)


module.exports=router;