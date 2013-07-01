var pause_button_html = '<form id="during_sprint"><a>Pause</a></form>' ;

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

describe('sprints.pauseFunctions.getRemainingDuration', function(){

  it ("will return the correct value for remaining duration time after a pause", function(){
    var sprint = new Sprint ;
    var date = new Date ;
    var current_minutes = date.getMinutes() ;
    var minutes_ten_minutes_ago = current_minutes -10 ;
    date.setMinutes(minutes_ten_minutes_ago) ;
    sprint.start_time = date ;
    sprint.end_time = commonUtils.timeFunctions.addMinutesAndCreateNewDate(date, 20) ;
    sprint.duration = 20 ;
    sprint.pause_duration = 5 ;
    remaining_minutes = sprints.pauseFunctions.getRemainingDuration(sprint) ;
    expect(remaining_minutes).toEqual(15) ;     
  })
  
})
