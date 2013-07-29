module TimeHelper

  def self.test_method
   return 5
  end

  def self.difference_in_days(start_date, end_date)  
    start_date = Date.parse(start_date.to_s)
    end_date = Date.parse(end_date.to_s)
    (end_date-start_date).to_i    
  end

end
