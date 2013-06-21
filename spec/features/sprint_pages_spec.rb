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
    
    it "should not display the before sprint form", :js do
      should_not have_selector('form#before_sprint')
    end
    
    it "will have a container div for the sub_process", :js do
      #should have_selector('div#sub_process_container')
    end
    
    it "will have a visible note section for reminders", :js do
      should_not have_selector('form#sprint_reminder_notes.display_none')
      should have_selector('form#sprint_reminder_notes')
    end
    
    it "will not have a visible note section for sprint brain dumps", :js do
       should have_selector('form#sprint_notes.display_none')
    end
    
  end
  
  describe "after clicking the '+ Process' button the first time" do
    before do 
      page.execute_script("$('#add_process').trigger('click')")
    end
    
    it "will create a div with name 'sub_process_0'", :js do
      should have_selector('div[name = "sub_process_0"]')
    end
    
    it "the subprocess input area will contain a 'Begin' link", :js do 
      should have_selector('div.sub_process a', text: "Begin")
    end
    
    it "the subprocess area will contain an 'End' link", :js do 
      should have_selector('div.sub_process a', text: "End")
    end
    
    it "the subprocess area will contain a pause link", :js do 
      should have_selector('div.sub_process a', text: "Pause")
    end
    
    it ('and the "Pause" link will be disabled'), :js, :focus do
      should have_selector('div.sub_process a[name="Pause"].disabled')
    end
    
    it "the subprocess area will contain a new sub_process button labeled '+ Sub Process'", :js do 
      should have_selector('div.sub_process a', text: "+ Sub Process")
    end
    
    it "the subprocess will contain a text input box'", :js do 
      should have_selector('div.sub_process input[name="description"]')
    end
    
    it "the subprocess area will contain alabel for the text box with the text 'Description:'", :js do 
      should have_selector('div.sub_process label', text: 'Description:')
    end
    
    describe "after clicking the '+ Process' button a second time" do
    
      before do 
        page.execute_script("$('#add_process').trigger('click')")
      end
      
      it 'should create a second sub_process div', :js  do
        should have_selector('div[name = "sub_process_0"]')
        should have_selector('div[name = "sub_process_1"]')
      end
      
    end
    
    describe "when I click the 'Begin' link" do
     
      before do 
        page.execute_script("$('div[name=\"sub_process_0\"] a:contains(\"Begin\")').trigger('click')")
      end
      
      it "will update the text of the link with time, disable the link, and remove the underline", :js do
        should have_selector('div[name="sub_process_0"] a.disabled[style="text-decoration: none;"]', text: ":")
      end
      
      it "will enable the 'Pause' link", :js, :focus do
        should_not have_selector('div[name="sub_process_0"] a[name="Pause"].disabled')
      end
    
    end
    
    describe "when I click the '+ Sub Process' link" do
    
      before do 
        page.execute_script("$('div[name=\"sub_process_0\"] a:contains(\"+ Sub Process\")').trigger('click')")
      end
    
      it "will create a div with name 'sub_process_0'", :js do
        should have_selector('div[name = "sub_process_0_0"]')
      end
      
      it "the subprocess input area will contain a 'Begin' link", :js do 
        should have_selector('div[name = "sub_process_0_0"] a', text: "Begin")
      end
      
      it "the subprocess area will contain an 'End' link", :js do 
        should have_selector('div[name = "sub_process_0_0"] a', text: "End")
      end
      
      it "the subprocess area will contain a pause link", :js do 
        should have_selector('div[name = "sub_process_0_0"] a', text: "Pause")
      end
      
      it "the subprocess area will contain a new sub_process button labeled '+ Sub Process'", :js do 
        should have_selector('div[name = "sub_process_0_0"] a', text: "+ Sub Process")
      end
      
      it "the subprocess will contain a text input box'", :js do 
        should have_selector('div[name = "sub_process_0_0"] input[name="description"]')
      end
      
      it "the subprocess area will contain alabel for the text box with the text 'Description:'", :js do 
        should have_selector('div[name = "sub_process_0_0"] label', text: 'Description:')
      end
    
    end
    
    describe "when I click the 'Pause' link" do
    
      before do 
        page.execute_script("$('div[name=\"sub_process_0\"] a:contains(\"Pause\")').trigger('click')")
      end
      
      it 'the link text will become "Resume"', :js do
        should have_selector('div[name="sub_process_0"] a:contains("Resume")')
        should_not have_selector('div[name="sub_process_0"] a:contains("Pause")')
      end
      
      describe "and after the link has the text 'Resume'" do
          describe "when I click the 'Resume' link" do
    
            before do 
              page.execute_script("$('div[name=\"sub_process_0\"] a:contains(\"Resume\")').trigger('click')")
            end
            
            it 'the link text will become switch back to "Resume"', :js  do
              should_not have_selector('div[name="sub_process_0"] a:contains("Resume")')
              should have_selector('div[name="sub_process_0"] a:contains("Pause")')      
            end
            
        end
      end
      
    end
    
  end
  
end
