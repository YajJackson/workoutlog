var express = require('express')
var app = express()
var http = require('http').Server(app)
var Sequelize = require('sequelize')
var bodyParser = require('body-parser')

app.use(require('./middleware/headers'))

app.use('/app/test', function(req, res){
  res.send('Hello World')
})

app.listen(3000, function(){
  console.log('app is listening on port: 3000')
})

// sequalize stuff
var sequelize = new Sequelize('workoutlog', 'postgres', 'nickman12', {
  host: 'localhost',
  dialect: 'postgres'
})

sequelize.authenticate().then(
  function() {
    console.log('connected to workoutlog postgress db')
  },
  function(err) {
    console.log(err)
  }
)

// build user model in sequelize
var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
})

User.sync()
// User.sync({ force: true })

// bodyParser will parse data off incoming requests and turn it into JSON.
app.use(bodyParser.json())

app.post('/api/user', function(req, res) {
  var username = req.body.user.username
  var pass = req.body.user.password
  
  User.create({
    username: username,
    passwordhash: ''
  }).then(
    function createSuccess(user){
      res.json({
        user: user,
        message: 'create'
      })
    },
    function createError(err){
      res.send(500, err.message)
    }
  )
})

