var router = require('express').Router();
var sequelize = require('../db.js')
var User = sequelize.import('../models/user')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

router.post('/', function(req, res) {
  var username = req.body.user.username;
  var pass = req.body.user.password;

  User.create({
    username: username,
    passwordhash: bcrypt.hashSync(pass, 10)

  }).then(function(user){
    var token = jwt.sign({id:user.id}, "secret", {expiresIn:86400})
    res.json({
        user: user,
        message: 'user created',
        sessionToken: token
    });
  },
  function(err){
    res.send(500, err.message);
  });
});

module.exports = router