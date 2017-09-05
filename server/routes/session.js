const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sequelize = require('../db.js')
const User = sequelize.import('../models/user')

router.post('/', (req, res) => {
    User.findOne({ where: { username: req.body.user.username } }).then((user) => {
      if(user){
        bcrypt.compare(req.body.user.password, user.passwordhash, (err, matches) => {
          if(matches){
            let token = jwt.sign({id:user.id}, 'secret', {expiresIn:86400})
            res.json({
              user: user,
              message: 'Authentication Successful',
              sessionToken: token
            })
          }else{
            res.status(500).send({error:'Authentication Failed: No Match'})
          }
        })
      }else{
        res.status(500).send({error:'Authentication Failed: User does not exist.'})
      }
    }, (err) => {res.json(err)})
})

module.exports = router