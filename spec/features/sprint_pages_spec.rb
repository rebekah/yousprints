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
    
    it "will have a ujs enabled form with the id 'during_sprint'", :js, :focus do
      should have_selector('form#during_sprint[data-remote="true"]')
    end
    
    it "will have a pause sprint button available", :js do
      should have_selector('a#pause_sprint', text: 'Pause')
    end
    
    context "When I click the pause button" do
      before do
        page.execute_script("$('a#pause_sprint:contains(\"Pause\")').trigger('click')")
      end
      
      it "will change the button text to 'Resume'", :js do
        should have_selector('a', text: 'Resume')
      end
      
      context "And then I click the button again (when it's labeled 'Resume')" do
        before do
          page.execute_script("$('a#pause_sprint:contains(\"Resume\")').trigger('click')")
        end
        
        it "will switch the button text back to 'Pause'", :js do 
          should have_selector('a', text: 'Pause')
        end
      end 
      
    end
    
    it "will display a button with the text '+ Process'", :js do
      should have_selector('a', text: '+ Process')
    end
    
    it "should not display the before sprint form", :js do
      should_not have_selector('form#before_sprint')
    end
    
    it "will have a container div for the sub_process", :js do
      should have_selector('div[name="sub_processes"]')
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
    
    it "the subprocess area will contain a disabled 'End' link", :js do 
      should have_selector('div.sub_process a.disabled', text: "End")
    end
    
    it "the subprocess area will contain a pause link", :js do 
      should have_selector('div.sub_process a', text: "Pause")
    end
    
    it ('and the "Pause" link will be disabled'), :js do
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
    
    it 'should not have a pop_over section', :js do
      should_not have_selector('.popover')
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
      
      it "will enable the 'Pause' link", :js do
        should_not have_selector('div[name="sub_process_0"] a[name="Pause"].disabled')
      end
      
      it "will enable the 'End' link", :js do
        should_not have_selector('div[name="sub_process_0"] a[name="End"].disabled')
      end
      
      describe "and then I click the 'End' link" do
    
        before do 
          page.execute_script("$('div[name=\"sub_process_0\"] a:contains(\"End\")').trigger('click')")
        end
      
        it 'should not have a pop_over section', :js  do
          should have_selector('.popover')
        end
        
        describe "and then I click the 'No' link" do
    
          before do 
            page.execute_script("$('div[name=\"sub_process_0\"] div.popover div div a:contains(\"No\")').trigger('click')")
          end 
          
          it 'should remove the pop_pover section', :js do
            should_not have_selector('.popover') 
          end
          
        end
        
        describe "and then I click the 'Yes' link" do
    
          before do 
            page.execute_script("$('div[name=\"sub_process_0\"] div.popover div div a:contains(\"Yes\")').trigger('click')")
          end 
          
          it 'should remove the visisibility of the links of the sub_process', :js do
            should have_selector('div[name="sub_process_0"] div.display_none a[name="Begin"]')
            should have_selector('div[name="sub_process_0"] div.display_none a:contains("Pause")')
            should have_selector('div[name="sub_process_0"] div.display_none a:contains("End")')
            should have_selector('div[name="sub_process_0"] div.display_none a:contains("+ Sub Process")')
          end
          
          it 'should display the sub_process total duration text', :js do
            should have_selector('div[name="sub_process_0"] div[name="end_message_container"] span:contains("Total Duration: ")')  
          end
          
          it 'should disable the text box of the sub_process', :js do
            should have_selector('div[name="sub_process_0"] input[disabled="disabled"]')
          end
          
        end
        
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
            
            it 'the link text will swtich back to "Pause"', :js  do
              should_not have_selector('div[name="sub_process_0"] a:contains("Resume")')
              should have_selector('div[name="sub_process_0"] a:contains("Pause")')      
            end
            
        end
      end
      
    end
    
  end
  
end
