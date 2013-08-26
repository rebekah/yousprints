describe('graph data munging functions', function(){

  var sprint_graph_data = 
    [
      {
        "sprints": [
            {"time": 1.1},
            {"percentage_complete": 20, "time": 2.0},
            {"percentage_complete": 30, "time": 3.5,}
        ], 
        "date_label": "Jan 1",
        "date": "2013-01-01"
      },
      {
        "sprints": [
          {"percentage_complete": 99, "time": 6},
          {"percentage_complete": 70, "time": 7},
          {"percentage_complete": 80, "time": 15}
        ], 
        "date_label": "Jan 2",
        "date": "2013-01-02"
      }
    ]
  
  it('will map the date labels properly into a seperate array', function(){
    var date_labels = graphs.getDateLabels(sprint_graph_data)
    expect(date_labels).toEqual(['Dec 31','Jan 1','Jan 2','Jan 3'])
  })
  
  it('will create the correct data points for the percentage map', function(){
    var percentage_data_point = graphs.getPercentageDataPoints(sprint_graph_data)
    expect(percentage_data_point).toEqual([[1,2.0, 20],[1,3.5,30],[2,6,99],[2,7,70],[2,15,80]])
  })


})

describe('graphs.getDateLabel', function(){
  var date1 = commonUtils.timeFunctions.getDateFromStringYYYYdashMMdashDD("2013-01-01")
  var date2 = commonUtils.timeFunctions.getDateFromStringYYYYdashMMdashDD("2013-12-31")
  var date_label1 = graphs.getDateLabel(date1)
  var date_label2 = graphs.getDateLabel(date2)
  it("will return the date label 'Jan 1' for date '2013-01-01'", function(){
   expect(date_label1).toEqual('Jan 1')
  })
  it("will return the date label 'Dec 31' for date '2013-12-31'", function(){
   expect(date_label2).toEqual('Dec 31')
  })
})
