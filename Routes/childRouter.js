const express= require("express");
const router=express.Router();
const childController=require("../controller/childController");
const teachValidation=require("../middleWares/Validations/childValidation")
const validationResult=require("../middleWares/Validations/validationResult")
const {isSupervisor , isTeacher} = require("../middleWares/authenticationMW")


router.route("/child")
.get(isSupervisor,childController.getAllChilds)
.post(isSupervisor,teachValidation.insertValidator,validationResult,childController.addChild)
.patch(teachValidation.UpdateValidator,validationResult,childController.UpdateChildData)
.delete(childController.daleteSpecifiedChild)

router.get("/child/:_id",childController.getChildByID)


module.exports=router;