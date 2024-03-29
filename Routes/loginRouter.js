const express= require("express");
const router=express.Router();
const AuthorizationController=require('../controller/authenticationController')

router.post("/login",AuthorizationController.login);

module.exports = router;
