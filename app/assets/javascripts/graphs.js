graphs = {

 monthNamesAbbr: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
 data_types: ["percentage_complete","duration","focus_intensity","happiness"],
 data_type_label: {"percentage_complete": "Percentage Complete","focus_intensity": "Intensity","duration": "Duration","happiness": "Happiness"},

  
  processGraphData: function(){

    if (typeof graph_info == "undefined") {
      ajax.getGraphData({date_range: "this_week", call_back_function: create_graphs})
    }
    
    function create_graphs(){
      var processed_graph_data = {"date_labels": graphs.getDateLabels(graph_info), "data_points": graphs.getGraphDataPoints(graph_info)}

      for(i = 0; i < graphs.data_types.length; i++){
       $('#graph_'+ graphs.data_types[i] + '').highcharts({
          chart: {
              type: 'bubble',
              zoomType: 'xy',
          },
          tooltip: {
            formatter: function(tooltip) {
              data_descriptor = ($(tooltip["chart"]["container"]).parent('div').attr('id') == "graph_percentage_complete") ? '% complete</b> (' : '</b> ('
              return '<b>'+ this.point.z + data_descriptor + commonUtils.timeFunctions.decimalMilitaryToStandardTimeFormat(this.y) + ' on ' + this.x + ')'
            }
          },
            title: {
            text: graphs.data_type_label[graphs.data_types[i]],
            style: {
              color: "#778877"
            }
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
              data: processed_graph_data["data_points"][graphs.data_types[i]],
              color: "#99bb99"
          } ]
       });
       
       
       $('tspan:contains("y_axis_label")').css('display','none') 
  
       $('text[x]').each(function(){
         var text = $(this).text()
         if (commonUtils.isInt(+text)){
           var time_string = commonUtils.timeFunctions.decimalMilitaryToStandardTimeFormat(+text, false)
           $(this).text(time_string)
         } 
       })

      }
      
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
  
  getGraphDataPoints: function(data){
    data_points = {}
    for(p = 0; p < graphs.data_types.length; p++){
      eval(graphs.data_types[p] + "_data_points = []") ;
      for(i = 0; i < data.length; i++){
        for(s = 0; s < data[i]["sprints"].length; s++){
          if (data[i]["sprints"][s]["time"] != undefined && data[i]["sprints"][s][graphs.data_types[p]] != undefined) {
            eval('' + graphs.data_types[p] + '_data_points.push([i+1,data[i]["sprints"][s]["time"],data[i]["sprints"][s][graphs.data_types[p]]])')
          }
        }
      }
      data_points[graphs.data_types[p]]=eval('' + graphs.data_types[p] + '_data_points')
    }
    return data_points ;
  },

}
