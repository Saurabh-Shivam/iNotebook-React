const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "Saurabhisagoodb$oy";

// Create a User using POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  // Adding a validation layer
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      // Hashing and salting the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // Adding JWT token authentication
      const data = {
        user: {
          id: user.id,
        },
      };
      // here we don't need to await bcz sign() is synchronous method, we will directly get the data
      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(authToken);
      res.json({ authToken }); // bcz we are using ES^we dont have to write res.json({authToken: authToken})

      // res.json(user);

      // catch errors
    } catch (error) {
      // For now using this but ideally we will have to send this to Logger or SQS
      console.error(error.message);
      res.send(500).send("Some error occured");
    }

    // .then((user) => res.json(user))
    // .catch((err) => {
    //   console.log(err);
    //   res.json({
    //     error: "Please enter a unique value for email",
    //     message: err.message,
    //   });
    // });

    // res.send(req.body);
  }
);

module.exports = router;