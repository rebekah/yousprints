var sub_process_fixture = "<div class = 'sub_process' name = 'sub_process_0'>  <input name = 'description' value = 'some description'/>  <div class = 'sub_process' name = 'sub_process_0_0'>    <input name = 'description' value = ''/>   </div>  <div class = 'sub_process' name = 'sub_process_0_1'>    <input name = 'description' value = ''/>   <div class = 'sub_process' name = 'sub_process_0_1_0'>      <input name = 'description' value = 'some description'/>      </div>  </div></div><div class = 'sub_process' name = 'sub_process_1'>  <input name = 'description' value = 'some description'/> </div>"
describe('extract_sub_processes', function() {
    beforeEach(function(){
      $('body').append('<div id = "fixture_container"></div>') ;
      $('div#fixture_container').html(sub_process_fixture) ;
    });
    afterEach(function(){
      $('div#fixture_container').remove();
    });
    
  it('does something that works', function() {
    expect($('div.sub_process').length).toBe(5);
  });
  it('finds and properly organizes the sub_process data into a JSON object', function() {
    
    var sub_processes = new subProcesses ;
        var sub_process_levels_list = ['_0','_0_0','_0_1','_0_1_0','_1'] ;
    for (i= 0 ; i < sub_process_levels_list.length ; i++) {
      $('div[name = "sub_process' + sub_process_levels_list[i] + '"]').data('duration',10).data('pause_duration', 1) ;    
    }
    var sub_processes_json = sub_processes.extract_sub_processes();
    test_json_string = 
      {
        "sub_processes": 
        [
          {
            "position": "_0",
            "description": "some description",
            "duration": 10,
            "pause_duration": 1,
            "sub_processes":
            [
              {
                "position": "_0_0",
                "description": "",
              "duration": 10,
              "pause_duration": 1
              },
              {
                "position": "_0_1",
                "description": "",
              "duration": 10,
              "pause_duration": 1,
                "sub_processes":
                [
                  {
                    "position": "_0_1_0",
                      "description": "some description",
              "duration": 10,
              "pause_duration": 1
                  }
                ]
              }
            ]
          },
          {
            "position": "_1",
            "description": "some description",
            "duration": 10,
            "pause_duration": 1
          }
        ]
      } ;
      
      test_json_string = JSON.stringify(test_json_string) ;
      expect(sub_processes_json).toBe(test_json_string);

  });
});

describe('subProcesses.createSubProcessInitializationName', function(){
  //with this function I can only test it one level deep as the array is not actually built so therefore I cannot test that something contained within an element that deosn't exist is actually built
  it (' createSubProcessInitializationName(level_value)', function(){
      var sub_processes = new subProcesses ;
      var name_part = sub_processes.createSubProcessInitializationName("_0") ;
     expect(name_part).toBe('["sub_processes"][0]') ;
  });
  it (' createSubProcessInitializationName(level_value)', function(){
      var sub_processes = new subProcesses ;
      var name_part = sub_processes.createSubProcessInitializationName("_1") ;
     expect(name_part).toBe('["sub_processes"][1]') ;
  });  
});

describe('subProcesses.getSibling', function(){
  beforeEach(function(){
    $('body').append('<div id = "fixture_container"></div>') ;
    $('div#fixture_container').html(sub_process_fixture) ;
  });
  afterEach(function(){
    $('div#fixture_container').remove();
  });
  it ('gets the correct number of siblings for the outer div', function(){
    var sub_processes = new subProcesses ;
    number_of_siblings = sub_processes.getNewSiblings('_0').length ;
    expect(number_of_siblings).toBe(1) ;      
  });
  it ('gets the correct number of siblings for an inner div', function(){
    var sub_processes = new subProcesses ;
    number_of_siblings = sub_processes.getNewSiblings('_0_1_0').length ;
    expect(number_of_siblings).toBe(0) ;
  });
})
