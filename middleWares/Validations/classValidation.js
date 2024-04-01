const { body, param, query } = require("express-validator");

exports.insertValidator = [
    body("name")
    .isAlpha().withMessage("Class name should be a string")
    .isLength({ min: 1 }).withMessage("Class name should be at least 2 characters long"),
    body("supervisor").isMongoId().withMessage("Supervisor id should be object"),
    body("children").isArray().withMessage("Children should be an array of child ids")

];

exports.UpdateValidator = [
    body("_id").isInt().withMessage("child id should be integer"),
    body("name").optional()
    .isAlpha().withMessage("Class name should be a string")
    .isLength({ min: 1 }).withMessage("Class name should be at least 2 characters long"),
    body("supervisor").isMongoId().withMessage("Supervisor id should be object"),
    body("children").optional().isArray().withMessage("Children should be an array of child ids")
  
  ];
