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
        expect(minutes).toBeGreaterThan(0) ;
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
  
  
  
}) ;
