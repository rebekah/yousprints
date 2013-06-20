//Ajax

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


//Sprint

function Sprint(){
  this.loss_of_focus = 0 ;
  this.interruption = 0 ;
};

Sprint.prototype.incrementLossOfFocus = function(){
 this.loss_of_focus += 1
}

Sprint.prototype.incrementInterruption = function(){
  this.interruption += 1
}

Sprint.prototype.change_cycle_text =  function(){
  var $link = $(event.target) ;
  var link_id = $(event.target).attr('id') ;
  var link_text = $(event.target).text() ;
  var fade_length = 1000 ;
  $link.addClass('disabled') ;
  $link.fadeOut(fade_length, function(){
    $link.text('count:' + eval('sprint.' + link_id ) );
    fadeInFadeOutAndResetLinkText() ;
  });
  function fadeInFadeOutAndResetLinkText() { 
    $link.fadeIn(fade_length, function(){
      setTimeout( FadeOutAndResetLinkText, 1500 ) ;
    }) ;
  } ; 
  function FadeOutAndResetLinkText(){
    $link.fadeOut(fade_length,function(){
      $link.text(link_text) ;
      fadeInAndRenableLink() ;
    }) ;
  } ;
  function fadeInAndRenableLink(){
   $link.fadeIn(fade_length,function(){
     $link.removeClass('disabled') ; 
   }) ;
  };   
}

//SubProcess

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

//Create new Dom elements

subProcessElements = {

  createNewSubProcess: function(container_name){
    if(typeof container_name == 'undefined')
      var container_name = 'sub_processes' ;
    var outer_level = subProcessElements.getOuterLevel(container_name) ;
    var outer_level_length = outer_level.split('_').length ;
    var tab_class = outer_level_length > 0 ? 'tab' : '' ;
    var margin_class = outer_level == "" ? 'sub_process_bottom_margin' : '' ;
    var outer_level_string = (outer_level == "") ? outer_level : outer_level + '_';
    var new_inner_level = subProcessElements.getNewInnerLevel(container_name) ;
    new_sub_process_html = "<div class = 'sub_process " + tab_class + " " + margin_class +"' name = 'sub_process_" + outer_level_string + new_inner_level + "'><label style = 'display:inline;' >Description: </label><input name = 'description'/><a>Begin</a><a>Pause</a><a>End</a><a>+Sub Process</a></div>" 
    $('div[name="'+ container_name +'"]').append(new_sub_process_html)
    return $('div[name = "sub_process_' + outer_level_string + new_inner_level + '"]')
  },
  
  getNewInnerLevel: function(container_name){
    var siblings = $('div[name="' + container_name + '"] > div.sub_process') ;
    if (siblings.length > 0) {
      var names = siblings.map(subProcessElements.getName) ;
      var levels = names.map(subProcessElements.getInnerLevels)
      sorted_levels = levels.sort() ;
      new_inner_level = $.makeArray(sorted_levels).pop() + 1 ;
      new_inner_level = new_inner_level + "" ;
      return new_inner_level ;
    }
    else
      return '0' ;
  },
  
  getOuterLevel: function(container_name){
    var outer_level = container_name.split('_').slice(2).join("_"); 
    return outer_level;
  },
  
  //map called on a jQuery object invokes the jQuery .map method which provides params in a different order than the javasc
  getName: function(index, value){
    return $(value).attr('name') ;  
  },
  
  getInnerLevels: function(index, value){
    var last_level = value.split('').pop() ;
    last_level = +last_level ;
    return last_level ;
  },
  
  createBindings: function(container_div){ 
  
    container_div.children('a:contains("Begin")').click(function(e){
      var link = e.target ; 
      e.preventDefault() ;
      $(link).addClass('disabled')
      var $parent = $(link).parent('div[name^="sub_process"]') ;
      var now = new Date ;
      $parent.data('start_time', now) ;
      var time_string = commonUtils.getTime(now) ;
      $(link).text('From ' + time_string).css('text-decoration', 'none');  
    })
    
    container_div.children('a:contains("+Sub Process")').click(function(e){
      e.preventDefault() ;
      var link = e.target ;
      var container_name = $(e.target).parent('div').attr('name');
      var container_div = subProcessElements.createNewSubProcess(container_name);   
      subProcessElements.createBindings(container_div);
    })
  
  }

};
