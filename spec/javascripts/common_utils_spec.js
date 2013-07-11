describe('common utility functions', function(){
  
  describe('date/time functions',function(){
  
    var now = new Date() 
    
    describe('commonUtils.getHour', function(){
    
      var now = new Date() 
      var hour = commonUtils.getHours(now);
      
      it('getHours should return an integer', function(){
        expect(commonUtils.isInt(hour)).toBe(true) ;
      }) ;
      
      it('getHours should be greater than or equal to 0', function(){
        expect(hour).toBeGreaterThan(0) ;
      }) ;
      
      it('getHours should be less than or equal to 24', function(){
        expect(hour).toBeLessThan(24) ;
      }) ;
      
    }) ;
    
    
    describe('commonUtils.getMinutes',function(){
    
      var minutes = commonUtils.getMinutes(now);
      
      it('getHour should return an integer', function(){
        expect(commonUtils.isInt(minutes)).toBe(true) ;
      }) ;
      
      it('getHour should be greater than or equal to 0', function(){
        expect(minutes).toBeGreaterThan(-1) ;
      }) ;
      
      it('getHour should be less than or equal to 24', function(){
        expect(minutes).toBeLessThan(60) ;
      }) ;
    
    });
    
    describe('commonUtils.getTime', function(){
      
      it('should return the correct string', function(){    
        var date_object = new Date();
        date_object.setHours(13);
        date_object.setMinutes(45) ;
        var time_string = commonUtils.getTime(date_object);
        expect(time_string).toEqual('1:45pm');
      })
      
      it('should return a two digit minute when the minute is actually a one digit number', function(){
        var date_object = new Date();
        date_object.setHours(2);
        date_object.setMinutes(1) ;
        var time_string = commonUtils.getTime(date_object);
        expect(time_string).toEqual('2:01am'); 
      })
    })
    
    describe('commonUtils.americanizedHour', function(){
    
      it('should return the americanized hour integer and ToD for 13:00', function(){
        var returned_value = commonUtils.americanizedHour(13);
        expect(returned_value).toEqual({'hour':1, 'ToD': 'pm'}) ;
      })
      
      it('should return the americanized hour integer and ToD for 1:00', function(){
        var returned_value = commonUtils.americanizedHour(1);
        expect(returned_value).toEqual({'hour':1, 'ToD': 'am'}) ;
      })
      
      it('should give the proper error message if an integer lower than 0 in as the param', function(){
        var returned_message = commonUtils.americanizedHour(-1);
        expect(returned_message).toEqual('The americanizeHour function requires an integer gte to 0 and lte 24.') ;        
      })
      
      it('should give the proper error message if an integer or higher than 24 is passed in as the param', function(){
        var returned_message = commonUtils.americanizedHour(25);
        expect(returned_message).toEqual('The americanizeHour function requires an integer gte to 0 and lte 24.') ;        
      })
           
      it('should give the proper error message if a string instead of an integer is passed in', function(){
        var returned_message = commonUtils.americanizedHour('hello');
        expect(returned_message).toEqual('The americanizeHour function requires an integer as the parameter.') ;      
      })
    
    })

  });
  
  describe('isInt',function(){
    
    it('should return false when passes a string',function(){
      var test_value = '1' ;
      expect(commonUtils.isInt('1')).toBe(false) ;
    }) ;
    
    it('should return false when passed a float',function(){
      expect(commonUtils.isInt(1.1)).toBe(false) ;
    }) ;
    
    it('should return true when passed a positive integer',function(){
      expect(commonUtils.isInt(1)).toBe(true) ;
    }) ;
    
    it('should return true when passed a negative integer',function(){
      expect(commonUtils.isInt(-1)).toBe(true) ;
    }) ;
    
    
  });
  
  describe('switchText', function(){
  
    beforeEach(function(){
      $('body').append('<div id = "fixture_container"></div>') ;
      $('div#fixture_container').html("<a>Pause</a>") ;
    });
    
    afterEach(function(){
      $('div#fixture_container').remove();
    });
    
    it ('should change the link text to Resume', function(){
      var link = $("a:contains('Pause')") ;
      commonUtils.switchText(link,"Resume") ;
      resume_link_length = $("a:contains('Resume')").length ;
      expect(resume_link_length).toEqual(1);
    })
    
  })
  
  describe('commonUtils.timeDifferenceInMinutes', function(){
  
    it('should return the correct difference in minutes when there is only a difference in minutes', function(){
      var date1 = new Date ;
      date1.setMinutes(40) ;
      var date2 = new Date ;
      date2.setMinutes(51) ;
      var time_difference_in_minutes = commonUtils.differenceInMinutes(date1,date2) ;
      expect(time_difference_in_minutes).toEqual(11) ;
    })
    
    it('should return the correct difference in minutes when there is only a difference in hours', function(){
      var date1 = new Date ;
      date1.setMinutes(40) ;
      date1.setHours(1) ;
      var date2 = new Date ;
      date2.setMinutes(51) ;
      date2.setHours(2) ; 
      var time_difference_in_minutes = commonUtils.differenceInMinutes(date1,date2) ;
      expect(time_difference_in_minutes).toEqual(71) ;
    })
    
    it('should return the correct decimal value difference in minutes when there is only a difference in seconds and the type is "decimal"', function(){
      var date1 = new Date ;
      date1.setMinutes(40) ;
      date1.setHours(1) ;
      date1.setSeconds(12) ;
      var date2 = new Date ;
      date2.setMinutes(40) ;
      date2.setHours(1) ;
      date2.setSeconds(42) ;
      var time_difference_in_minutes = commonUtils.differenceInMinutes(date1,date2, "decimal") ;
      expect(time_difference_in_minutes).toEqual(.5) ;
    })
  
  })
  
  describe ('commonUtils.timeFunctions.addMinutesAndCreateNewDate', function(){
    var date = new Date ;
    var later_date = commonUtils.timeFunctions.addMinutesAndCreateNewDate(date,10) ;
    difference = commonUtils.differenceInMinutes(date,later_date) ;
    expect(difference).toEqual(10);
  })

  describe('commonUtils.flashMessage', function(){
  
    beforeEach(function(){
     $('body').append("<div id='fixture_container'></div>") ;
     $('#fixture_container').append(nav_html) ;
    })
    
    afterEach(function(){
      $('#fixture_container').remove() ;
    })
    
    
    it('will create a new notice message div', function(){
      commonUtils.flashMessage('notice','This is a flash notice.') ;
      expect($('div.alert-success').length).toEqual(1) ;
    })
    
    it('will create a new alert message', function(){
      commonUtils.flashMessage('alert','This is a flash alert.') ;
      expect($('div.alert-alert').length).toEqual(1) ;  
    })
    
    it('will create a new error message', function(){
      commonUtils.flashMessage('error','This is a flash error.') ;
      expect($('div.alert-error').length).toEqual(1) ;  
    })
    
  })
  
}) ;
