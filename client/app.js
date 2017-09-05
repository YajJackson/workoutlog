$(document).ready(function(){
  $(testAPI).click(function(){
    console.log('All systems operational')
  })
  
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/api/test',
    error: function(err){
      console.log('Oh no!', err)
    }
  }).done(function(data){
    console.log(data)
  })

  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/api/user',
    data: {
      "user": {
        "name": 'sandman',
        "password": 'Password2'
      }
    }
  }).done(function(data){
    console.log(data)
  })
  
})