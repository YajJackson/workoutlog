$(function(){
  $.extend(WorkoutLog, {
    signup: function(){
      let password = $(su_password).val()
      let username = $(su_username).val()
      let user = {
        user: {
          username: username,
          password: password
        }
      }
      
      let signup = $.ajax({
        type:'POST',
        url:`${WorkoutLog.API_BASE}user`,
        data: JSON.stringify(user),
        contentType: 'application/json'
      })

      signup.done(function(data){
        WorkoutLog.setAuthHeader(data.sessionToken)

        $(signup_modal).modal('hide')
        $('.disabled').removeClass('disabled')
        $(loginTab).text('Logout')
      }).fail(function(){
        $(su_error).text('There was an issue with sign up.').show()
      })
    }
  })
  $(signupButton).click(WorkoutLog.signup)
})