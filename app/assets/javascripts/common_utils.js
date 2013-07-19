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
  
  differenceInMinutes: function(older_date,more_recent_date, type){  
    var diff = more_recent_date-older_date
    if (typeof type == "undefined" || type == "integer")
      difference_in_minutes = Math.round(diff / 60000) ;
    else if ( type = "decimal" )
       difference_in_minutes = Math.round(100 * (diff / 60000))/100 ;
    return difference_in_minutes ;
  },
  
  timeFunctions: {
  
    addMinutesAndCreateNewDate: function(original_date_object, minutes_to_add){
      original_seconds = original_date_object.getSeconds() ;
      new_seconds = original_seconds + (minutes_to_add * 60) ;
      new_date = commonUtils.timeFunctions.cloneDate(original_date_object) ;
      new_date.setSeconds(new_seconds) ;
      return new_date ;
    },
  
    cloneDate: function(date){
      new_date = new Date(date.getTime()) ;
      return new_date ;
    }
  
  },
  
  switchText: function($jquery_element, new_text, call_back, hold_duration) {
    $jquery_element.text(new_text) ;
    if (typeof call_back != "undefined"){
      if (typeof hold_duration != "undefined"){
        setTimeout(call_back, hold_duration) ;
      }
      else {
       call_back() ;
      }
    }
  },
  
  flashText: function($jquery_element, current_text, new_text, hold_duration){
    commonUtils.switchText($jquery_element, new_text, function(){commonUtils.switchText($jquery_element, current_text)}, hold_duration) ; 
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
  
  flashMessage: function(type, message){
    var type = (type == 'notice') ? 'success' : type ;
    var html = '<div class="alert alert-' + type + '"><a class="close" data-dismiss="alert">x</a>' + message + '</div>'
    $('div.navbar').after(html) ;
  }
  
  
}
