graphs = {

 monthNamesAbbr: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
  
  processGraphData: function(){

    if (typeof graph_info == "undefined") {
      ajax.getGraphData({date_range: "this_week", call_back_function: create_graphs})
    }
    
    function create_graphs(){
      var processed_graph_data = {"date_labels": graphs.getDateLabels(graph_info), "percentage_data_points": graphs.getPercentageDataPoints(graph_info), "intensity_data_points": graphs.getIntensityDataPoints(graph_info), "consistency_data_points": graphs.getConsistencyDataPoints(graph_info), "duration_data_points": graphs.getDurationDataPoints(graph_info)}
      $('#graph_percentage_complete').highcharts({
         chart: {
             type: 'bubble',
             zoomType: 'xy',
         },
         tooltip: {
           formatter: function() {
             return '<b>'+ this.point.z +'% complete</b> (' + commonUtils.timeFunctions.decimalMilitaryToStandardTimeFormat(this.y) + ' on ' + this.x + ')'
           }
         },
           title: {
           text: 'Percentage Complete'
         },
         xAxis: {
           title: {
               text: ''
           },
           categories: processed_graph_data["date_labels"]
         },
         yAxis: {
           title: {
               text: 'y_axis_label'
           },
           gridLineWidth: 0,
           tickInterval: 1,
           min: 0,
           max: 24
         },
         legend: {
            enabled: false
         },
         series: [{
             data: [[1,9.5,10],[2,15,60],[2,8,58],[3,19,56],[4,11,73],[7,15,100]]
         } ]
      });
    }
       
  },
  
  getDateLabels: function(sprint_graph_data){
    var date_labels = sprint_graph_data.map(function(value, index){return value["date_label"]})
    var first_date_string = sprint_graph_data[0]["date"]
    var first_date = commonUtils.timeFunctions.getDateFromStringYYYYdashMMdashDD(first_date_string)
    var first_date = commonUtils.timeFunctions.addDaysAndCreateNewDate(first_date, -1)
    var last_date_string = sprint_graph_data[sprint_graph_data.length - 1]["date"]
    var last_date = commonUtils.timeFunctions.getDateFromStringYYYYdashMMdashDD(last_date_string)
    var last_date = commonUtils.timeFunctions.addDaysAndCreateNewDate(last_date, + 1)
    date_labels.unshift(graphs.getDateLabel(first_date))
    date_labels.push(graphs.getDateLabel(last_date))  
    return date_labels
  },
  
  getDateLabel: function(date){  
    var month_abbr = graphs.monthNamesAbbr[date.getMonth()]  
    var day_num = date.getDate()
    var day_string = day_num.toString()
    return month_abbr + " " + day_string
  },
  
  getPercentageDataPoints: function(data){
    var percentage_data_points = []
     for(i = 0; i < data.length; i++){
       for(s = 0; s < data[i]["sprints"].length; s++){
         if (typeof data[i]["sprints"][s]["time"] != "undefined" && typeof data[i]["sprints"][s]["percentage_complete"] != "undefined") {
           percentage_data_points.push([i+1,data[i]["sprints"][s]["time"],data[i]["sprints"][s]["percentage_complete"]])
         }
       }
     }
    return percentage_data_points ;
  },

  getIntensityDataPoints: function(data){},
  
  getConsistencyDataPoints: function(data){},
  
  getDurationDataPoints: function(data){}
}
