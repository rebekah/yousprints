function Sprint(){};

$(function(){

  sprint = new Sprint ;
  
  $('#before_sprint').submit(function(event){
      event.preventDefault();
      submit_sprint_form.call(event.target,"POST",$(event.target).attr('action'));
  })
  
  $('#during_sprint').submit(function(event){
      event.preventDefault();
      if (typeof sprint.id != 'undefined'){
        submit_sub_process_data.call( event.target, "PUT", sprint.id ) ;
      }
      else {
        console.log ('The update of sprint did not succeed because sprint.id was not yet defined') ;
      }

  })

})

function submit_sprint_form(type,url) {
    var valuesToSubmit = $("#" + this.id + "").serialize();
    $.ajax({
        type: type,
        url: url,
        data: valuesToSubmit,
        dataType: "JSON" 
    }).success(function(data){
      sprint.id = data._id

    });
    return false; 

};

function submit_sub_process_data() {
    var authenticity_token = $('#during_sprint input[name="authenticity_token"]').first().attr('value');
    var valuesToSubmit = {"authenticity_token": authenticity_token, "sub_processes": {"1": [{"1": 1},{"1": 1}]}};
    $.ajax({
        type: "PUT",
        url: sprint.id,
        data: valuesToSubmit,
        dataType: "JSON" 
    }).success(function(data){

    });
    return false; 

};

function subProcesses(){
  this.sub_process_JSON = {} ;
}

subProcesses.prototype.extract_sub_processes = function() {
  //this.sub_process_JSON["sub_processes"] = [] ; 
  this.processNextLevel.call(this,'_0') ; 
  json = JSON.stringify(this.sub_process_JSON) ;
  return json ; 
};

subProcesses.prototype.processNextLevel = function(level_value) {
  var div_name = 'sub_process' + level_value + '' ;
  var position = level_value ;
  var description = $('div.sub_process[name="' + div_name + '"] > input[name="description"]').val() ;
  var start = $('div.sub_process[name="' + div_name + '"] > input[name="start"]').val() ;
  var end = $('div.sub_process[name="' + div_name + '"] > input[name="end"]').val() ;
  sub_process_initialization_name = sub_processes.createSubProcessInitializationName(level_value) ;
  eval('this.sub_process_JSON' +  sub_process_initialization_name + ' = {"position": level_value, "description": description, "start": start, "end": end} ;') ;
  var new_siblings = this.getNewSiblings(level_value) ;
  this.processSiblings.call(this,level_value) ;
  this.processChildren.call(this,level_value); 
}

subProcesses.prototype.processSiblings = function(level_value){
 var new_siblings = this.getNewSiblings(level_value) ;
    for(i=0; i < new_siblings.length; i++){
      sibling_level_value = $(new_siblings[i]).attr('name').split('sub_process')[1] ;
      this.processNextLevel.call(this, sibling_level_value) ;
      this.processChildren.call(this,sibling_level_value);
    }   
};


subProcesses.prototype.getNewSiblings = function(level_value){
  siblings = $('div.sub_process[name="sub_process' + level_value + '"]').siblings('div.sub_process') ;
  debugger
  var new_siblings = []
  var this_level = level_value.split('').pop() ;
  for(i=0; i < siblings.length; i++){
    sibling_level = $(siblings[i]).attr('name').split('').pop() ;
    if (this_level < sibling_level){
      new_siblings.push(siblings[i])
    }      
  }
  return new_siblings ;
};

subProcesses.prototype.processChildren = function(level_value){
    var children= this.getChildren(level_value) ;
    for(i=0; i<children.length; i++) {
      child_level_value = $(children[i]).attr('name').split('sub_process')[1] ;
      this.processNextLevel.call(this, child_level_value) ;
    }  
};

subProcesses.prototype.getChildren = function(level_value){
  children = $('div.sub_process[name="sub_process' + level_value + '"] > div.sub_process') ;
  return children ;
};


subProcesses.prototype.createSubProcessInitializationName = function (level_value){
    
    var levels_array = level_value.split("_") ;
    sub_process_initialization_name = '' ;
    for(i = 1; i < levels_array.length; i++) {
        sub_process_initialization_name = '' + sub_process_initialization_name + '["sub_processes"][' + levels_array[i] +']'
        var level_of_initialization = sub_process_initialization_name.split('').slice(0,-3).join('') ;
        if ( typeof eval("this.sub_process_JSON" + level_of_initialization) == 'undefined' ) {
          eval("this.sub_process_JSON" + level_of_initialization + "= []") ;
        }

    }
    return sub_process_initialization_name ;
}
