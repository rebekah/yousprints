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
    
    addDaysAndCreateNewDate: function(original_date_object, days_to_add){
      original_seconds = original_date_object.getSeconds() ;
      new_seconds = original_seconds + (days_to_add * 24 * 60 * 60) ;
      new_date = commonUtils.timeFunctions.cloneDate(original_date_object) ;
      new_date.setSeconds(new_seconds) ;
      return new_date ;
    },
  
    cloneDate: function(date){
      new_date = new Date(date.getTime()) ;
      return new_date ;
    },
    
    militaryHourToStandardHour: function(number){
      if (typeof number != "undefined" && typeof number == "number"){
        if (number >= 13 && number <= 24){
          var time = number - 12
          var time_hash = {"time": time, "type": "pm"}
        }
        else if (number >= 12 && number < 13){
          var time_hash = {"time": number, "type": "pm"}
        }
        else if (number >= 0 && number <= 24){
          var time_hash = {"time": number, "type": "am"}     
        }
        return time_hash 
      }
      else { return 'Args Error: requires a number between 0 and 24'}
    },
    
    convertToHHMM: function (info) {
      var hrs = parseInt(Number(info));
      var min = Math.round((Number(info)-hrs) * 60);
      return hrs + ':' + commonUtils.leadingZero(min,2);
    },
    
    decimalMilitaryToStandardTimeFormat: function(number,with_type){
      if (typeof number != "undefined" && typeof number == "number" && number >= 0 && number <= 24){
        var standard_time_decimal_hash = commonUtils.timeFunctions.militaryHourToStandardHour(number) 
        if (typeof with_type == "undefined" || with_type != true){
          var time_string = commonUtils.timeFunctions.convertToHHMM(standard_time_decimal_hash["time"]) + standard_time_decimal_hash["type"]
        }
        else{
          var time_string = commonUtils.timeFunctions.convertToHHMM(standard_time_decimal_hash["time"])      
        }
        return time_string
      }
      else { return 'Args Error: requires a number between 0 and 24'}
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
  },
  
  leadingZero: function(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
   
}
