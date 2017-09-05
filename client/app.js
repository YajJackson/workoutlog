$(document).ready(function(){
  $(testAPI).click(function(){
    console.log('All systems operational')
  })
  
  $.ajax({
    type: 'GET',
    url: 'http://local:3000',
    error: function(){
      console.log('Oh no!')
    }
  }).done(function(data){
    console.log(data)
  })
  
})