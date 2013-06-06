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
    
    it "should have a form with the id before_sprint" do
      should have_selector('form#before_sprint')
    end
    
    it "should have a form that contains an input labeled sprint 'Duration'" do 
     should have_selector('input#sprint_duration')
    end
    
    it "the input labeled duration should have class integer" do
      should have_selector('input#sprint_duration.integer')
    end
    
    it "should have a form that contains a textarea for the intention" do 
      should have_selector('textarea#sprint_intention')
    end
    
    it "will not have a visible note section for sprint brain dumps" do
      should_not have_selector('form#sprint_notes.display_none')
      should have_selector('form#sprint_notes')
    end
    
    it "will not have a visible note section for reminders", :js do
      should have_selector('form#sprint_reminder_notes.display_none')
    end
    
  end
  
  describe "after the sprint is initiated" do
    before do
      page.execute_script("$('input[value=\"Create Sprint\"]').trigger('click')")
    end
    it "will display a button with the text '+ Process'", :js do
      #should have_selector('a', text: '+ Process')
    end
    
    it "should not display the before sprint form", :js, :focus do
      should_not have_selector('form#before_sprint')
    end
    
    it "will have a container div for the sub_process", :js do
      #should have_selector('div#sub_process_container')
    end
    
    it "will have a visible note section for reminders", :js, :focus do
      should_not have_selector('form#sprint_reminder_notes.display_none')
      should have_selector('form#sprint_reminder_notes')
    end
    
    it "will not have a visible note section for sprint brain dumps", :js, :focus do
       should have_selector('form#sprint_notes.display_none')
    end
    
  end
  
  describe "after clicking the '+ process' button the first time" do
    
    it "will make avaliable a description input box for the sub_process" do
      
    end
    
    it "the subprocess input area will contain a start button" do
      #by checking for the input siblings
    end
    
    it "the subprocess input area will contain a pause button"
    
    it "the subprocess input area will contain a end button" do end
    
    it "the subprocess input area will contain a new sub_process button labeled '+ sub_processes'" do end
    
    describe "when I click the '+ sub_process' button" do
      it "will make a new sub_process set of elements within the containing sub_process div" do
        
      end
      
      #see above tests, they are almost identical to the ones I will employ for this section... possibly create a shared example?
      
    end
    
  end
  
end
