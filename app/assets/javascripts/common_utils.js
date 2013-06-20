commonUtils = {
  
  getHours: function(date_object){
   return date_object.getHours();
  },
  
  getMinutes: function(date_object){
    return date_object.getMinutes();
  },
  
  isInt: function(n) {
   return typeof n === 'number' && n % 1 == 0;
  },
  
  getTime: function(date_object){
   var d_o = date_object ;
   var hour = commonUtils.getHours(d_o) ;
   var americanized_hour_and_ToD = commonUtils.americanizedHour(hour) ;
   var americanized_hour = americanized_hour_and_ToD['hour']
   var ToD = americanized_hour_and_ToD['ToD']
   var minutes = commonUtils.getMinutes(d_o)+"" ;
   if (minutes.length == 1)
    minutes = "0" + minutes ;
   var time_string = americanized_hour + ':' + minutes + ToD ;
   return time_string ;
  },
  
  americanizedHour: function(hour){
    if (commonUtils.isInt(hour)){   
      if (hour >= 0 && hour <= 12) {
       return_value =  {'hour': hour, 'ToD': 'am'};
      }  
      else if (hour >= 12 && hour <= 24) {
       var americanized_hour = hour - 12 ;
       return_value =  {'hour': americanized_hour, 'ToD': 'pm'};
      }       
      else {
       return_value =  'The americanizeHour function requires an integer gte to 0 and lte 24.' ;
      }
    }
    else {
    return_value =  'The americanizeHour function requires an integer as the parameter.' ;
    }
   return return_value ;
  }
}
