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
        console.log('User created: ', data.sessionToken)
        $(signup_modal).modal('hide')
        $('.disabled').removeClass('disabled')
        $(loginTab).text('Logout')
      }).fail(function(){
        $(su_error).text('There was an issue with sign up.').show()
      })
    },

    login: function(){
      let username = $('#li_username').val()
      let password = $('#li_password').val()
      let user = {
        user: {
          username: username,
          password: password
        }
      }

      let login = $.ajax({
        type: 'POST',
        url: WorkoutLog.API_BASE+'login',
        data: JSON.stringify(user),
        contentType: 'application/json'
      })

      login.done(function(data){
        if(data.sessionToken){
          WorkoutLog.setAuthHeader(data.sessionToken)
          $(login_modal).modal('hide')
          $('.disabled').removeClass('disabled')
          $(loginTab).text('Logout')
        }
      }).fail(function(){
        $('#li_error').text('There was an issue with sign up').show();
      })
    },

    loginout: function() {
      if(window.localStorage.getItem('sessionToken')) {
        window.localStorage.removeItem('sessionToken')
        $(loginTab).text('Login')
      }
    }
  })

  $(loginButton).click(WorkoutLog.login)
  $(signupButton).click(WorkoutLog.signup)
  $(loginTab).click(WorkoutLog.loginout)
})