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
  },
  
  differenceInMinutes: function(older_date,more_recent_date){  
    var diff = more_recent_date-older_date
    difference_in_minutes = Math.round(diff / 60000) ;
    return difference_in_minutes ;
  },
  
  switchText: function($jquery_element, new_text) {
    $jquery_element.text(new_text) ;
  },
  
  realTypeOf: function(v) {
    if (typeof(v) == "object") {
      if (v === null) return "null";
      if (v.constructor == (new Array).constructor) return "array";
      if (v.constructor == (new Date).constructor) return "date";
      if (v.constructor == (new RegExp).constructor) return "regex";
      return "object";
    }
    return typeof(v);
  },
  
  
}
