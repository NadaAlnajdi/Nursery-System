const { body, param, query } = require("express-validator");

exports.insertValidator = [
  body("_id").isMongoId().withMessage("teacher id should be object"),
  body("fullName")
  .isAlpha().withMessage("teacher username should be string")
  .isLength({min:5}).withMessage(" teacher userName lenght>5"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").isStrongPassword().withMessage("Invalid password"),
  body("image").isString().withMessage("image should be a string"),

];

exports.UpdateValidator = [
    body("_id").isMongoId().withMessage("teacher id should be object"),
    body("fullName").optional()
    .isAlpha().withMessage("teacher username should be string")
    .isLength({min:5}).withMessage(" teacher userName lenght>5"),
    body("email").optional().isEmail().withMessage("Invalid email address"),
    body("password").optional().isLength({ min: 8 }).withMessage("Password should be at least 8 characters long"),
    body("image").optional().isString().withMessage("image should be a string"),
  
  ];
exports.changePassword = [
    body("newPassword").isLength({ min: 8 }).withMessage("Password should be at least 8 characters long"),
  ];

