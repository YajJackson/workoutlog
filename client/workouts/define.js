$(function(){
  $.extend(WorkoutLog, {
    definition: {
      userDefintions: [],
      create: function(){
        var def = {
          desc: $('#def-description').val(),
          type: $('#def-logType').val()
        }
        var postData = {definition:def}
        var define = $.ajax({
          type: 'POST',
          url: WorkoutLog.API_BASE+'definition',
          data: JSON.stringify(postData),
          contentType: 'application/json'
        })

        define.done(function(data){
          WorkoutLog.definition.userDefintions.push(data.definition)
        })
      },
      fetchAll: function(){
        var fetchDefs = $.ajax({
          type: 'GET',
          url: WorkoutLog.API_BASE+'definition',
          headers: {
            'authorization': window.localStorage.getItem('sessionToken')
          }
        }).done(function(data){
          WorkoutLog.definition.userDefintions = data
        }).fail(function(err){
          console.log(err)
        })
      }
    }
  })
})