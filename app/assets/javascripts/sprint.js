//Ajax

ajax = {

  submitSprintForm: function(type,url,form_id, values_to_submit) {
      var valuesToSubmit = (typeof values_to_submit == 'undefined') ? $("#" + form_id + "").serialize() : values_to_submit ;
      $.ajax({
          type: type,
          url: url,
          data: valuesToSubmit,
          dataType: "JSON" 
      }).success(function(data){
       if (sprint.id == undefined) {
        sprint.id = data._id
       }
      });
      return false; 
  
  },
  
  submitMidSprintData: function() {
      var sub_processes = new subProcesses ;
      var sub_processes_json = sub_processes.extract_sub_processes() ;
      var reminder_notes = $("form#sprint_reminder_notes textarea").val()
      var valuesToSubmit = {"sub_processes": sub_processes_json, "reminder_notes": reminder_notes };
      $.ajax({
          type: "PUT",
          url: "/sprints/" + sprint.id,
          data: valuesToSubmit,
          dataType: "JSON" 
      }).success(function(data){
      });
      return false; 
  
  },

  submitFinalSprintData: function(){
         
      // submit final duration end_time - pause_time - start_time  ;
      sprints.addInputElementsToDuringSprintForm() ;
      sprints.setActionOnForm('during_sprint') ;
      $('form#during_sprint').submit() ;
      
      // submit assessment info as a regular form submit which will refresh the page and provide for a flash notice upon success
      sprints.setActionOnForm('assess_sprint') ;
      $('form#assess_sprint').submit() ;
  },
  
  getGraphData: function(args){ 
    var message = {}
    if ( typeof args != "undefined" && typeof args["date_range"] != "undefined") { message["date_range"] = args["date_range"]}
    $.ajax({
      type: "GET",
      url: "/sprints",
      data: message,
      dataType: "JSON"
    }).success(function(data){
      graph_info = data
      if(typeof args["call_back_function"] != "undefined"){
        args["call_back_function"]()
      }
    })
  }

}

//Sprint

function Sprint(){
  this.loss_of_focus_count = 0 ;
  this.interruptions = 0 ;
  this.duration = 0 ;
  this.start_encapsulation_start_time = new Date ;
  this.start_time = '';
  this.end_time = '' ;
  this.pause_duration = 0 ;
};

Sprint.prototype.incrementLossOfFocus = function(){
 this.loss_of_focus_count += 1
}

Sprint.prototype.incrementInterruption = function(){
  this.interruptions += 1
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

sprints = {

  end_notification_sound: '/audio/comp_notification.mp3',
  
  playSound: function() {
    $('body').append("<embed src='" + sprints.end_notification_sound + "' hidden='true' autostart='true' loop='false' class='playSound'>")    
  },

  atSprintDurationEnd: function(){
    sprints.playSound();
    sprints.initiateLightBox();
  },
  
  atSprintCompletion: function(sprint){
    sprints.removeFlashMessages() ;
    ajax.submitFinalSprintData(sprint) ;
  },
  
  beforeAssessSprint: function(){        
    // submit subprocess info and sprint_reminder notes
    ajax.submitMidSprintData() ;
  },
  
  initiateLightBox: function(){
    $('#sprint_duration_end').lightbox_me({closeClick: false});
  },
  
  onAddTime: function(sprint){
    //need to add form validation here!!!
      var time_to_add = $('form#add_time input.minutes').val();
      var time_to_add = time_to_add++ ;
      sprints.addTime(sprint,time_to_add) ;
      sprints.resetTimer(sprint) ;
      ajax.submitSprintForm('PUT',''+ sprint.id, '', {"sprint": {"duration": sprint.duration}} )
      $('div#sprint_duration_end').trigger('close') ;
      $('form#on_sprint_completion').css('display', 'block') ;
      $('form#add_time').css('display', 'none') ;
      var minute_text = (time_to_add == 1) ? 'minute' : 'minutes' ;
      var message_text = time_to_add + ' ' + minute_text + ' has been added to your sprint.' ;
      commonUtils.flashMessage('notice', message_text) ;
  },    
  
  toggle_pause_button_text: function($link,cur_text){
    if (cur_text == 'Pause')
     var new_text = 'Resume' ;
    else if (cur_text == 'Resume')
      var new_text = 'Pause' ;
    $link.text(new_text) ;
  },
  
  pauseFunctions: {
    storePauseInfo: function(cur_text, sprint){
      if (cur_text == 'Pause'){
        sprint.pause_start = new Date ;
      }
      if (cur_text == 'Resume'){
        var pause_length = commonUtils.differenceInMinutes(sprint.pause_start, new Date, "decimal") ;
        sprint.pause_duration = pause_length ;
      }
    }
  },
  
  addTime: function(sprint,time_in_minutes){
    sprint.duration = sprint.duration + time_in_minutes
    sprint.end_time = commonUtils.timeFunctions.addMinutesAndCreateNewDate(sprint.end_time, time_in_minutes) ;  
  },
  
  getRemainingDuration: function(sprint){
    var now = new Date ;
    var remaining_minutes = commonUtils.differenceInMinutes(now, sprint.end_time, "decimal") ;
    return remaining_minutes ;
  },
    
  resetTimer: function (sprint){
    var remaining_minutes = sprints.getRemainingDuration(sprint) ;
    sprints.timer.setTimer(sprint, remaining_minutes) ;
  },

  timer: {
  
    setTimes: function(sprint){
      sprint.start_time = new Date ;
      sprint.end_time = commonUtils.timeFunctions.addMinutesAndCreateNewDate(new Date, sprint.duration);
    },
    
    setTimer: function(sprint,remaining_minutes){ 
     var time_in_milliseconds = (typeof remaining_minutes != "undefined") ? (remaining_minutes * 60000) : (sprint.duration * 60000) ;
     sprint.sprint_timer = setTimeout(sprints.atSprintDurationEnd,time_in_milliseconds) ;
    }
  
  },
  
  assessSprint: function(){
    $('form#on_sprint_completion').css('display', 'none') ;
    $('form#assess_sprint').css('display','block') ;
  },
  
  addInputElementsToDuringSprintForm: function(){
    var loss_of_focus_count_input = '<input  type = "hidden" name = "sprint[loss_of_focus_count]" value = ' + sprint.loss_of_focus_count + '>' ;
    var interruptions_input = '<input  type = "hidden" name = "sprint[interruptions]" value = ' + sprint.interruptions + '>' ;
    $('#during_sprint input[name="authenticity_token"]').after(loss_of_focus_count_input) ;
    $('#during_sprint input[name="authenticity_token"]').after(interruptions_input) ;
  },
  
  setActionOnForm: function(form_id) {
    var action_string = $('form#' + form_id + '').attr('action') + sprint.id
    $('form#' + form_id + '').attr('action', action_string)
  },
  
  removeFlashMessages: function() {
    if ($('div.alert a.close').length > 0)
    $('div.alert a.close').trigger('click')
  },
  
  displaySavingMessage: function($message_element, $form, $value_element) {
    if (typeof $form != "undefined" && typeof $value_element != undefined) {
      if ($value_element.val() != ''){
        $message_element.fadeIn(1000, function(){setTimeout(function(){$message_element.fadeOut(1000)},2000)}) ;
      }
    }
  }
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
  var duration = $('div.sub_process[name="' + div_name + '"]').data('duration') ;
  var pause_duration = $('div.sub_process[name="' + div_name + '"]').data('pause_duration') ;
  sub_process_initialization_name = this.createSubProcessInitializationName(level_value) ;
  eval('this.sub_process_JSON' +  sub_process_initialization_name + ' = {"position": level_value, "description": description, "duration": duration, "pause_duration": pause_duration} ;') ;
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
    var new_div_level = outer_level_string + new_inner_level ;
    var new_sub_process_div_name = 'sub_process_' + new_div_level ;
    var new_sub_process_html = "<div class = 'sub_process " + tab_class + " " + margin_class +"' name = '" + new_sub_process_div_name + "'><label style = 'display:inline;' >Description: </label><input name = 'description'/><div name = 'end_message_container' class = 'inline'></div><a name = 'Begin'>Begin</a><a name = 'Pause' class = 'disabled'>Pause</a><a name = 'End' class = 'disabled'>End</a><a name = '+Sub Process'>+ Sub Process</a></div>" 
    $('div[name="'+ container_name +'"]').append(new_sub_process_html) ;
    return $('div[name = "sub_process_' + outer_level_string + new_inner_level + '"]') ;
  },
  
  createPopover: function(div_name, div_level){
    sub_process_end  = new popOver('sub_process_' + div_level + '_end_popover','SPE', div_name,'<div>Are you sure?</div><div><a style="margin:0px 5px 0px 10px">Yes</a><a style="margin:0px 10px 0px 5px">No</a></div>');
    sub_process_end.initiate();
    sub_process_end.setEventHandlers(['shown','hide']);      
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
  
  getDivLevel: function(container_name){
    return subProcessElements.getOuterLevel(container_name) ;
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
      var $link = $(e.target) ; 
      e.preventDefault() ;
      $link.addClass('disabled')
      $link.siblings('a[name="Pause"]').removeClass("disabled") ;
      $link.siblings('a[name="End"]').removeClass("disabled") ;
      var $parent = $link.parent('div[name^="sub_process"]') ;
      var now = new Date ;
      $parent.data('start_time', now) ;
      var time_string = commonUtils.getTime(now) ;
      $link.text(time_string).css('text-decoration', 'none');
      container_name = $parent.attr('name') ;
      div_level = subProcessElements.getDivLevel(container_name);
      subProcessElements.createPopover(container_name, div_level);
    })
    
    container_div.children('a:contains("+ Sub Process")').click(function(e){
      e.preventDefault() ;
      var link = e.target ;
      var container_name = $(e.target).parent('div').attr('name');
      var container_div = subProcessElements.createNewSubProcess(container_name);   
      subProcessElements.createBindings(container_div);
    })
    
    container_div.children('a:contains("Pause")').click(function(e){
      e.preventDefault() ;
      var $link = $(e.target) ;
      var fade_length = 500 ;
      var $container_div = $link.parent('div') ;
      if ($link.text() == 'Pause'){
        var new_text = 'Resume' ;
        subProcessElements.bindingFunctions.startPause($container_div);
      }
      else {
        var new_text = 'Pause' ;
        subProcessElements.bindingFunctions.endPause($container_div);
      }
      var container_name = $(e.target).parent('div').attr('name');
      commonUtils.switchText($link, new_text) ;
    })
    
  },
  
  bindingFunctions: {
  
    startPause: function($container_div){
      var now = new Date ;
      $container_div.data('pause_start_time', now) ;
    },
    
    endPause: function($container_div){
      var now = new Date() ;
      if ( $container_div.data('pause_start_time') != undefined ){
        pause_start_time = $container_div.data('pause_start_time') ;
        total_minutes = commonUtils.differenceInMinutes(pause_start_time, now) ;
        if ( $container_div.data('pause_duration') != undefined ){
          new_time = $container_div.data('pause_duration') + total_minutes ;
          $container_div.data('pause_duration', new_time) ;
        }
        else {
          $container_div.data('pause_duration', total_minutes) ;
        }
        
      }
    }
  
  },
  
  end: function($container_div, $link){
    $link.popover('hide') ;
    $container_div.children('a').wrap('<div class = "display_none"></div>') ;
    $container_div.children('input').attr('disabled', 'true') ;
    var sub_process_duration = subProcessElements.subProcessDuration($container_div) ;
    $container_div.data('duration', sub_process_duration) ;
    $container_div.children('div[name="end_message_container"]').html("<span style = 'padding-left:15px'>Total Duration: " + sub_process_duration + "</span>") ;
  },
  
  subProcessDuration: function($container_div){
    var start_time = $container_div.data('start_time') ;
    var now = new Date ;
    var elapsed_time = commonUtils.differenceInMinutes(start_time, now, 'decimal') ;
    var total_pause_time = $container_div.data('pause_duration') ;
    if(total_pause_time != undefined){
      var sub_process_duration = elapsed_time - total_pause_time ;
    }
    else {
      var sub_process_duration = elapsed_time ;
    }
    return sub_process_duration ;
  }
  
};                   
