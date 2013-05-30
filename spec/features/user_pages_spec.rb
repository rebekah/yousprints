require 'spec_helper'

describe 'logging in' do
  context "before I log in" do
    subject {page}
    
    before do
      visit root_path
    end
    
    it {current_path.should == new_user_session_path}
    
    it "should provide a log in form" do
      should have_text('Sign in')
      should have_selector('form#new_user')
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