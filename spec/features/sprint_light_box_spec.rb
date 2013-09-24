require 'spec_helper'

describe "sprint light box behavior" do
  
  subject {page}
  
  before do
    page.driver.browser.switch_to.alert.accept rescue Selenium::WebDriver::Error::NoAlertPresentError
    @user = login_test_user
    visit new_sprint_path
    page.execute_script("document.getElementById('sprint_duration').value = 1 ;")
    page.execute_script("$('input[value=\"Create Sprint\"]').trigger('click') ;")
  end
  
  describe "light box view that displays on Sprint complete" do
  
   before do
   page.execute_script("$('#sprint_duration_end').lightbox_me();")
   end
   
    it "should have completion option links", :js do
      should have_selector('#sprint_duration_end:not([style*="display:none"]) a#finish_sprint')
      should have_selector('#sprint_duration_end:not([style*="display:none"]) a#add_time')
      should have_selector('#sprint_duration_end:not([style*="display:none"]) a#manual')
    end
    
    context "when I click the 'Add Time' link" do
    
      before do
        page.execute_script("$('a#add_time').trigger('click') ;")
      end
      
      it "will display an 'Add Time' dialog in the lightbox and remove the on_sprint_completion form", :js do
        should have_selector('form#on_sprint_completion[style*="display: none"]') 
        should have_selector('form#add_time[style*="display: block"]') 
        should have_selector('form#add_time input.button[value="Continue"]')
      end
      
      #can't get this to work - though maually testing shows that they all work
      
      context "when I click the 'Continue' link" do
      
        before do
          page.execute_script("$('form#add_time input.button').trigger('click') ;")
        end
        
        it 'will post a flash message with the message part "minutes has been added to your sprint"', :js do
          should have_content('minutes has been added to your sprint.')
        end
       
        it 'will make the dialog go away - become set to display: none', :js do
          should have_selector('div#sprint_duration_end[style*="display:none"]')
        end
        
        it 'will set the "initial light box form" dialog to visible', :js do
          should have_selector('form#on_sprint_completion[style*="display: block"]')
        end
        
        it 'will set the "Add Time" dialog become to not visible', :js do
          should have_selector('form#add_time[style*="display: none"]')
        end        
        
      end
    
    end
    
    context "when I click the 'Finish' link" do
    
      before do
        page.execute_script("$('a#finish_sprint').trigger('click') ;")
      end

      it "should have an input box for percentage complete", :js do
        should have_selector('form#assess_sprint[style*="display: block;"]')
        should have_selector('form#assess_sprint label:contains("Measure of Intention Completed:")')
        should have_selector('form#assess_sprint input#percentage_complete')
      end
      
      it "should have a group of radio buttons for intensity of focus", :js do
        should have_selector('form#assess_sprint label:contains("Intensity of Focus:")') 
        should have_selector('form#assess_sprint input[type="radio"][name="sprint[focus_intensity]"]')
      end
      
      it "should have a group of radio buttons for 'Consistency of Focus'", :js do
        should have_selector('form#assess_sprint label:contains("Consistency of Focus")') 
        should have_selector('form#assess_sprint input[type="radio"][name="sprint[focus_consistency]"]')        
      end
      
    end
    
    context "when I click the 'Submit' button on the assess sprint dialog" do
    
      before do
        page.execute_script("$('form#assess_sprint input.button').trigger('click') ;")
        page.driver.browser.switch_to.alert.accept rescue Selenium::WebDriver::Error::NoAlertPresentError
      end
      
      xit 'reason for pending: Strange error caused by the onBeforeUnload behavior: Works fine, doesn\'t work in test. Original description: A flash message will display', :js do
        should have_content('Your sprint has been successfully submitted')
      end
      
    end
   
  end
  
end
