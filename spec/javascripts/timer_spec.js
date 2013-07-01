describe('sprints.timer.setTimes', function(){
  
  var sprint = new Sprint ;
  
  it('will create the correct end time associated with the sprint when the duration is 20 minutes', function(){
    sprint.duration = 20 ;
    sprints.timer.setTimes(sprint) ;
    difference_between_beggining_and_end_times = commonUtils.differenceInMinutes(sprint.start_time, sprint.end_time)
    expect(difference_between_beggining_and_end_times).toEqual(20) ;
  })
  
  it('will create the correct end time associated with the sprint when the duration is 60 minutes', function(){
    sprint.duration = 60 ;
    sprints.timer.setTimes(sprint) ;
    difference_between_beggining_and_end_times = commonUtils.differenceInMinutes(sprint.start_time, sprint.end_time)
    expect(difference_between_beggining_and_end_times).toEqual(60) ;
  })

})
