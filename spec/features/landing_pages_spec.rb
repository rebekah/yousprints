require 'spec_helper'

describe "landing pages spec" do
  
  subject {page}
  
  before do
    login_test_user
    visit root_path
  end
  
  it "will provide the neccesary link for navigating to the new sprint form" do
      page.should have_selector('a', text: 'Start Sprint')
  end
  
  context 'clicking the Start Sprint link' do
    
    before do
      click_link('Start Sprint')
    end
    
    it "should route me to the new_sprint_path" do
      current_path.should == new_sprint_path
    end
    
  end
  
  it "will privide the link for nevigating to the sprint show page" do end
  
  describe "daily notes" do
    it "will have an interface for creating 'Daily Notes'" do
      should have_content('Daily Brain Dump')
      should have_selector('textarea#note_content')
    end
  end
  
  #make test for the behavior of navigating away from the page and having the content I had typed in saved - can I do some interesting Javascript thing that notices when I am leaving one the page - or should I just do it for every link on th epage - that might work just as well
end
