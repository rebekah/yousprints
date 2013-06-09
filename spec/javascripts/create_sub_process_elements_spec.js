var sub_process_fixture_double = "<div name='sub_processes' ><div class = 'sub_process' name = 'sub_process_0'>  <input name = 'description' value = 'some description'/>  <input name = 'start' value = 'the start time'/>  <input name = 'end' value = 'the end time'/>  <div class = 'sub_process' name = 'sub_process_0_0'>    <input name = 'description' value = ''/>    <input name = 'start'/>    <input name = 'end'/>  </div>  <div class = 'sub_process' name = 'sub_process_0_1'>    <input name = 'description' value = ''/>    <input name = 'start'/>    <input name = 'end'/>    <div class = 'sub_process' name = 'sub_process_0_1_0'>      <input name = 'description' value = 'some description'/>      <input name = 'start' value = 'the start time'/>      <input name = 'end' value = 'the end time'/>    </div>  </div></div><div class = 'sub_process' name = 'sub_process_1'>  <input name = 'description' value = 'some description'/>  <input name = 'start' value = 'the start time'/>  <input name = 'end'  value = 'the end time'/></div></div>"


describe("acquiring the outer level value for our new sub_process div", function(){
  //It appears I cannot test functions within functions - may need to structure my objects differently
  
  it("will return _0_1 when passed in the name sub_process_0_1_0", function(){
    var outer_level = subProcessElements.getOuterLevel('sub_process_0_1_0') ;
    expect(outer_level).toBe('0_1_0') ;
  });
  
  it ('will return the correct string when passed in one of the inner sub processes container div names', function(){
     var outer_level = subProcessElements.getOuterLevel('sub_processes') ;
     expect(outer_level).toBe('')
  })


})

describe("getNewInnerLevel", function(){
  beforeEach(function(){
    $('body').append('<div id = "fixture_container"></div>') ;
    $('div#fixture_container').html(sub_process_fixture_double) ;
  });
  afterEach(function(){
    $('div#fixture_container').remove();
  });

  it ('will return the correct string when passed in the sub processes outer container div name', function(){
     var new_inner_level = subProcessElements.getNewInnerLevel('sub_processes') ;
     expect(new_inner_level).toBe('2')
  })
  
  it ('will return the correct string when passed in one of the inner sub processes container div names', function(){
     var inner_levels = subProcessElements.getNewInnerLevel('sub_process_0_1') ;
     expect(inner_levels).toBe('1')
  })
  it ('will return the correct string when passed in one of the inner sub processes container div names', function(){
     var inner_levels = subProcessElements.getNewInnerLevel('sub_process_0') ;
     expect(inner_levels).toBe('2')
  })
  it ('will return the correct string when passed in one of the inner sub processes container div names', function(){
      var inner_levels = subProcessElements.getNewInnerLevel('sub_process_0_1_0') ;
     expect(inner_levels).toBe('0')
  })        
    
});  

describe("getNames", function(){

  beforeEach(function(){
    $('body').append('<div id = "fixture_container"></div>') ;
    $('div#fixture_container').html(sub_process_fixture_double) ;
  });
  afterEach(function(){
    $('div#fixture_container').remove();
  });
  
  it ("will return the correct array of names when given a set of dom elements", function(){
    var dom_elements = $('div[name = "sub_processes"] > div.sub_process')
    var names = dom_elements.map(subProcessElements.getName)
    expect(names).toBe(["sub_process_0", "sub_process_1"])
  })
  
  it ("will return the correct array of names when given a set of dom elements", function(){
    var dom_elements = $('div[name = "sub_process_0"] > div.sub_process')
    var names = dom_elements.map(subProcessElements.getName)
    expect(names).toBe(["sub_process_0_0", "sub_process_1_1"])
  })

});

describe("getInnerLevels", function(){

  beforeEach(function(){
    $('body').append('<div id = "fixture_container"></div>') ;
    $('div#fixture_container').html(sub_process_fixture_double) ;
  });
  afterEach(function(){
    $('div#fixture_container').remove();
  });
  
  it ("will return the correct array of inner levels when given a set of dom elements", function(){
    var names =$(["sub_process_0", "sub_process_1"]) ;
    var outer_levels = names.map(subProcessElements.getInnerLevels)
    outer_levels = $.makeArray(outer_levels)
    expect(outer_levels).toEqual([0, 1])
  })
  
  it ("will return the correct array of inner levels when given a set of dom elements", function(){
    var names =$(["sub_process_0_1_0"]) ;
    var outer_levels = names.map(subProcessElements.getInnerLevels)
    outer_levels = $.makeArray(outer_levels)
    expect(outer_levels).toEqual([0])
  })

});
