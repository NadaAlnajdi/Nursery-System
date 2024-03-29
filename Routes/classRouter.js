const express= require("express");
const router=express.Router();
const classController=require("../controller/classController");
const classValidation=require("../middleWares/Validations/classValidation")
const validationResult=require("../middleWares/Validations/validationResult")
const {isSupervisor , isTeacher} = require("../middleWares/authenticationMW")


router.route("/class")
.get(isSupervisor,classController.getAllClasses)
.post(isSupervisor,classValidation.insertValidator,validationResult,classController.addClass)
.patch(isSupervisor,classValidation.UpdateValidator,validationResult,classController.UpdateClassData)
.delete(isSupervisor,classController.daleteSpecifiedClass)

router.get("/class/:id",isSupervisor,classController.getClassByID)

router.get("/class/child/:id",classController.getcClassChildInfo)
router.get("/class/teacher/:id",classController.getcClassTeacherInfo)


module.exports=router;