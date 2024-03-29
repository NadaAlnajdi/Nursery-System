const express= require("express");
const router=express.Router();
const teacherController=require("../controller/teacherController");
const teachValidation=require("../middleWares/Validations/teacherValidation")
const validationResult=require("../middleWares/Validations/validationResult")
const {isSupervisor , isTeacher} = require("../middleWares/authenticationMW")



router.get("/teachers/supervisors",isSupervisor,teacherController.getAllSupervisors)

router.route("/teachers")
.get(isSupervisor,teacherController.getAllTeachers)
.post(isSupervisor,teachValidation.insertValidator,validationResult,teacherController.addTeacher)
.patch(teachValidation.UpdateValidator,validationResult,teacherController.UpdateTeacherData)
.delete(teacherController.daleteSpecifiedTeacher)

router.get("/teachers/:id",teacherController.getTeacherByID)


module.exports=router;