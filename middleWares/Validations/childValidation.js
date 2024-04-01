const { body, param, query } = require("express-validator");

exports.insertValidator = [
  body("fullName")
  .isAlpha().withMessage("child username should be string")
  .isLength({min:5}).withMessage(" child userName lenght>5"),
  body("age").isInt({ min: 3 }).withMessage("Child age should be a positive integer"),
  body("level").isIn(["PreKG", "KG1", "KG2"]).withMessage("Child level should be one of PreKG, KG1, KG2"),


];

exports.UpdateValidator = [
    body("_id").isInt().withMessage("child id should be integer"),
    body("fullName").optional()
    .isAlpha().withMessage("child username should be string")
    .isLength({min:5}).withMessage(" child userName lenght>5"),
    body("age").optional().isInt({ min: 3 }).withMessage("Child age should be a positive integer"),
    body("level").optional().isIn(["PreKG", "KG1", "KG2"]).withMessage("Child level should be one of PreKG, KG1, KG2"),
    body("address.city").optional().isString().withMessage("City should be a string"),
    body("address.street").optional().isString().withMessage("Street should be a string"),
    body("address.building").optional().isString().withMessage("Building should be a string")
  ];

