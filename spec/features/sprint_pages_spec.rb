require 'spec_helper'

describe "creating a new sprint" do
  
  subject {page}
  
  before do
    @user = login_test_user
    visit new_sprint_path
  end
  
  describe "the 'New Sprint' page before initiating the sprint" do
  
    it "should have a place for brain dumping" do
      should have_content('Sprint Brain Dump')
      should have_selector('textarea#note_content');
    end
    
    it "should have a form that contains an input labeled sprint 'Duration'" do 
     should have_selector('input#sprint_duration')
    end
    
    it "should have a form that contains an input labeled sprint 'Realistic Expectation'" do 
      should have_selector('input#expectation')
    end
   
    it "should have a form that contains an select input labeled 'Current Capability Level'" do 
      should have_selector('input#capacity')
    end
    
    describe "hover event over the Current Capacity label - maybe this is a test for jasmine?" do
    
      before do 
        #roll_over ('label#current_capacity')
      end
      
      it "should have a pop-over that comes up when one hovers over the 'Current Capability Level' label that contains the text - 'your relevant capbility level on a scale of zero to ten(zero: none, ten: max)'" do 
        #should have_selector('input#sprint_duration')
      end
      
    end
    
  end
  
  describe "after the sprint is initiated" do
    
    it "should have a notes section labeled Reminders" do end
    
  end
  
end
