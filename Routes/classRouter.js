const express= require("express");
const router=express.Router();
const classController=require("../controller/classController");
const classValidation=require("../middleWares/Validations/classValidation")
const validationResult=require("../middleWares/Validations/validationResult")
const {isAdmin , isTeacher} = require("../middleWares/authenticationMW")


router.route("/class")
.get(isAdmin,classController.getAllClasses)
.post(isAdmin,classValidation.insertValidator,validationResult,classController.addClass)
.patch(isAdmin,classValidation.UpdateValidator,validationResult,classController.UpdateClassData)
.delete(isAdmin,classController.daleteSpecifiedClass)

router.get("/class/:id",isAdmin,classController.getClassByID)

router.get("/class/child/:id",classController.getcClassChildInfo)
router.get("/class/teacher/:id",classController.getcClassTeacherInfo)


module.exports=router;