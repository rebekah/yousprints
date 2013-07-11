var pause_button_html = '<form id="during_sprint"><a>Pause</a></form>' ;
var nav_html = "<div class = 'navbar'></div>" ;
var extend_sprint_time_html = '<div id="sprint_duration_end" style="left: 50%; margin-left: -217px; z-index: 1002; position: fixed; top: 40px; display: block;" class="light_box"><div class="modal_x_icon"><a>X</a></div><form id="on_sprint_completion" style="display: none;"></form><form id="add_time" style="display: block;"><div id="add_time_input_section">  <label>Minutes to add:</label>  <input type="text" class="minutes" value="45">   <input class="button" type="submit" value="Continue"></div></form></div>' ;
var during_sprint_form = '<form id = "during_sprint"><input name = "authenticity_token"/></form>'

describe('toggle_pause_button_text', function(){

  beforeEach(function(){
   $('body').append("<div id='fixture_container'></div>") ;
   $('#fixture_container').append(pause_button_html) ;
  })
  
  afterEach(function(){
    $('#fixture_container').remove() ;
  })
  
  it('will change the text of the link to "Resume" from "Pause"', function(){
    var $link = $('form#during_sprint a') ;
    var cur_text = $link.text() ;
    sprints.toggle_pause_button_text($link,cur_text) ;
    var link_text = $('form#during_sprint a').text() ;
    expect(link_text).toEqual('Resume') ;
  })
  
  it('will change the text of the link to "Pause" from "Resume"', function(){
    $('form#during_sprint a').text('Resume') ;
    var $link = $('form#during_sprint a') ;
    var cur_text = $link.text() ;
    sprints.toggle_pause_button_text($link,cur_text) ;
    var link_text = $('form#during_sprint a').text() ;
    expect(link_text).toEqual('Pause') ;
  })

})

describe('sprints.pauseFunctions.storePauseInfo', function(){
  it('will set the pause_start time when cur_text == "Pause"', function(){
   var sprint = new Sprint ;
   sprints.pauseFunctions.storePauseInfo('Pause', sprint);
   var pause_start_type = commonUtils.realTypeOf(sprint.pause_start) ;
   expect(pause_start_type).toEqual("date") ;
  })
  
  it('will set the pause_duration when cur_text == "Resume"',function(){
    var sprint = new Sprint ;
    var date = new Date ;
    var current_minutes = date.getMinutes();
    var minutes_ten_minutes_ago = current_minutes -10
    ten_minutes_ago = date.setMinutes(minutes_ten_minutes_ago) ;
    sprint.pause_start = ten_minutes_ago;
    sprints.pauseFunctions.storePauseInfo('Resume', sprint);
    expect(sprint.pause_duration).toEqual(10) ;
  })

})

describe('sprints.getRemainingDuration', function(){

  it ("will return the correct value for remaining duration time after a pause", function(){
    var sprint = new Sprint ;
    sprint.start_time = new Date ;
    sprint.end_time = commonUtils.timeFunctions.addMinutesAndCreateNewDate(sprint.start_time, 15) ;
    remaining_minutes = sprints.getRemainingDuration(sprint) ;
    expect(remaining_minutes).toEqual(15) ;     
  })
  
})

describe('sprints.addTime', function(){
  
  it('will change the end_time by the specified amount', function(){
    sprint = new Sprint ;
    old_end_time = sprint.end_time = new Date ;
    sprints.addTime(sprint, 15) ;
    difference_between_end_times = commonUtils.differenceInMinutes(old_end_time, sprint.end_time) ;
    expect(difference_between_end_times).toEqual(15) ;
  })

})

describe('sprints.onAddTime', function(){

  beforeEach(function(){
   $('body').append("<div id='fixture_container'></div>") ;
   $('#fixture_container').append(extend_sprint_time_html) ;
  })
  
  afterEach(function(){
    $('#fixture_container').remove() ;
  })
  
  it('will change the end_time by the specified amount', function(){
    var sprint = new Sprint ;
    var old_end_time = sprint.end_time = new Date ;
    //Working from minutes value on form
    sprints.onAddTime(sprint) ;
    var difference_between_end_times = commonUtils.differenceInMinutes(old_end_time, sprint.end_time) ;
    expect(difference_between_end_times).toEqual(45) ;
  })
  
  it('will set the "Add Time" dialog to not visible', function(){
    sprint = new Sprint ;
    var old_end_time = sprint.end_time = new Date ;
    sprints.onAddTime(sprint) ;
    var add_time_form_visibility = ($('div#sprint_duration_end form#add_time:visible').length > 0) ? true :false
    expect(add_time_form_visibility).toBe(false) ;    
  })
  
  it('will set the "initial light box form" dialog to visible', function(){
    var sprint = new Sprint ;
    var old_end_time = sprint.end_time = new Date ;
    sprints.onAddTime(sprint) ;
    var light_box_visiblity = ($('div#sprint_duration_end form#on_sprint_completion:visible').length > 0) ? true :false
    expect(light_box_visiblity).toBe(true) ;  
  })

})

describe('sprints.addInputElementsToDuringSprintForm', function(){

  beforeEach(function(){
   $('body').append("<div id='fixture_container'></div>") ;
   $('#fixture_container').append(during_sprint_form) ;
  })
  
  afterEach(function(){
    $('#fixture_container').remove() ;
  })
  
  it('Will have a distractions input with the value of 3', function(){
    sprint = new Sprint ;
    sprint.interruptions = 3 ;
    sprints.addInputElementsToDuringSprintForm() ;
    var distractions = $('input[name="sprint[interruptions]"]').val() ;
    expect(distractions).toEqual("3") ;
  })
  
  it('Will have a loss_of_focus input with the value of 4', function(){
    sprint = new Sprint ;
    sprint.loss_of_focus_count = 4 ;
    sprints.addInputElementsToDuringSprintForm() ;
    var loss_of_focus_count = $('input[name="sprint[loss_of_focus_count]"]').val() ;
    expect(loss_of_focus_count).toEqual("4")   
  })

})
