const User = require("../models/UserModel");

module.exports = app => {
  // Register User
  app.post("/register", (req, res) => {
    // Create a User
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });

    // Save User in the database
    user
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "An error occurred while creating the User."
        });
      });
  });

  // Login User
  app.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send({ user: "Error on the server." });
      if (!user) return res.status(404).send({ user: "No user found." });
      var passwordIsValid = req.body.password === user.password;
      if (!passwordIsValid)
        return res.status(401).send({ user: "invalid email or password" });
      res.status(200).send({ user: user });
    });
  });

  // Retrieve a single User with userId
  app.get("/user/:userId", (req, res) => {
    User.findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User not found with id " + req.params.userId
          });
        }
        res.send(user);
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "User not found with id " + req.params.userId
          });
        }
        return res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId
        });
      });
  });

  // Update a User with userId
  app.put("/user/:userId", (req, res) => {
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "User content can not be empty"
    //     });
    // }

    // Find user and update it with the request body
    User.findByIdAndUpdate(
      req.params.userId,
      {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      },
      { new: true }
    )
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User not found with id " + req.params.userId
          });
        }
        res.send(user);
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "User not found with id " + req.params.userId
          });
        }
        return res.status(500).send({
          message: "Error updating user with id " + req.params.userId
        });
      });
  });

  // Delete a User with userId
  app.delete("/user/:userId", (req, res) => {
    User.findByIdAndRemove(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User not found with id " + req.params.userId
          });
        }
        res.send({ message: "User deleted successfully!" });
      })
      .catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: "User not found with id " + req.params.userId
          });
        }
        return res.status(500).send({
          message: "Could not delete user with id " + req.params.userId
        });
      });
  });
};
