const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  console.log("req.body", req.body);
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_key",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        theme: fetchedUser.theme
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}

exports.setTheme = (req, res, next) => { 
  const { userId, email } = res.locals.userData;
  const query = { 'email': email };
  const data = { theme: req.body.theme };
  User.findOneAndUpdate(query, data, { upsert: false }, function (err, doc) {
    if (err) return res.send(500, { error: err });
    return res.send('Succesfully saved.');
  });
}

exports.getProfile = (req, res, next) => {
  const { userId, email } = res.locals.userData;
  User.findById(userId)
    .then(user => {
      res.status(200).json(user);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "User not found!" });
      }
    })
    .catch(err => {
      return res.status(500).json({
        message: "Fetching user failed!"
      });
    });
};
