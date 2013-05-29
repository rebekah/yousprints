require 'spec_helper'

describe "creating a new sprint" do
  
  subject {page}
  
  describe "navigating to the sprints page" do
    before do 
      @user = login_test_user
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
    
    
    
  end
  
end
