graphs = {

 monthNamesAbbr: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
    
 thisMonthLabels: function(){
   var date = new Date() ;
   var todays_date = date.getDate() ;
   var month_string = graphs.monthNamesAbbr[date.getMonth()] ;
   var labels = new Array ;
   for (i = 1; i <= todays_date; i++) {
     var day_string = graphs.getDayString(i) ;
     labels.push(month_string + " " + day_string )
   }
   debugger
   return labels ;
 },
 
  getDayString: function(numberical_date){
    var end_number = +((numberical_date+"").split('').pop())
    switch(end_number)
    {
      case 1:
        var number_string = numberical_date + 'st' ;
        break;
      case 2:
        var number_string = numberical_date + 'nd' ;
        break;
      case 3:
        var number_string = numberical_date + 'rd' ;
        break;
      default:
        var number_string = numberical_date + 'th' ;
        break;
    }
    return number_string ;
  },
  
  setGraphData: function(graph_info, data){
      
  }

}
