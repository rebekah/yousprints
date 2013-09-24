require 'spec_helper'

describe "the index page" do

  subject {page} 

  before do
    page.driver.browser.switch_to.alert.accept rescue Selenium::WebDriver::Error::NoAlertPresentError
    @user = login_test_user
    visit notes_path
  end

  it "should not have a 'Daily Notes' link in the top nav" do
    should_not have_selector('div.navbar div.pull-right a:contains("Daily Notes")')
  end 
  
  it "should have a link to home in the top nav" do
    should have_selector('div.navbar div.pull-right a:contains("Home")')
  end
  
  
end
