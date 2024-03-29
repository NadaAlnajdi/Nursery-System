const express= require("express");
const router=express.Router();
const childController=require("../controller/childController");
const childValidation=require("../middleWares/Validations/childValidation")
const validationResult=require("../middleWares/Validations/validationResult")
const uploadMW = require("../middleWares/uploadMW")
const {isSupervisor , isTeacher} = require("../middleWares/authenticationMW")


router.route("/child")
.get(isSupervisor,childController.getAllChilds)
.post(isSupervisor,uploadMW.single('image'),childValidation.insertValidator,validationResult,childController.addChild)
.patch(uploadMW.single('image'),childValidation.UpdateValidator,validationResult,childController.UpdateChildData)
.delete(childController.daleteSpecifiedChild)

router.get("/child/:_id",childController.getChildByID)


module.exports=router;