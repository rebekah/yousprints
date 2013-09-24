require 'spec_helper'

describe 'logging in' do
  context "before I log in" do
    subject {page}
    
    before do
      visit root_path
    end
    
    it {current_path.should == new_user_session_path}
    
    it "should provide a log in form" do
      should have_selector('h2:contains("Sign in")')
      should have_selector('form#new_user')
    end
    
    it "should not have any in app navigation" do
      should_not have_selector('div.navbar div.pull-right a:contains("Home")')
      should_not have_selector('div.navbar div.pull-right a:contains("Daily Notes")')
    end
    
    context "when I log in" do
      before do
        user = create_test_user
        fill_in ('user_email'), with: user.email
        fill_in ('user_password'), with: user.password
        click_button'Sign in' 
      end
      
      it { current_path.should == root_path}
      it { should have_selector('a', text: 'Log Out')}
      
    end
    
  end
end
