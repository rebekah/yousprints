function Sprint(){};

$(function(){

  sprint = new Sprint ;
  
  $('form#before_sprint').on('ajax:success', function(event, data, status, xhr){
      debugger
    sprint.id = data._id
  });

})



