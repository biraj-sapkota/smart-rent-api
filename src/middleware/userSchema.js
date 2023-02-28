const { body, validationResult } = require("express-validator");

const userSchema = [
  body("name", "Enter a valid Name")
    .isLength({ min: 4 })
    .matches(/^[a-zA-Z\s]+$/),
  body("DOB", "Enter a valid date").isDate(),
  body("contact", "Enter a valid contact").matches(/^98\d{8}$/),
  body("address", "Enter a valid Address")
    .isLength({ min: 4 })
    .matches(/^[a-zA-Z\s]+$/),
  body("gender")
    .isIn(["male", "female"])
    .withMessage("Gender must be either male or female"),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Enter a valid password").isLength({ min: 4, max: 20 }),
];

const validateUserSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { userSchema, validateUserSchema };
