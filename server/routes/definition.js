var router = require('express').Router()
var sequelize = require('../db')
var User = sequelize.import('../models/user.js')
var Definition = sequelize.import('../models/definition.js')

router.post('/', function(req,res){

  var description = req.body.definition.desc
  var logType = req.body.definition.type
  var owner = req.user.id

  Definiton.create({
    description: description,
    logType: logType,
    owner: owner
  }).then(
    function success(definition){
      res.json({
        definition:definition
      })
    },
    function throwErr(err){
      res.send(500,err.message)
    }
  )
})

router.get('/', function(req, res){
  var userid = req.user.id
  Definition.findAll({
    where: {owner: userid}
  }).then(
    function success(data){
      res.json({data})
    },
    function throwErr(err){
      res.send(500,err.message)
    }
  )
})

module.exports = router