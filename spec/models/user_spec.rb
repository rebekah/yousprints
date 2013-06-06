require 'spec_helper'

describe User do
  
  before { @user = login_test_user }
  
  describe "relating a sprint to a specific user" do
    
    before { @user.sprints << Sprint.new }
    
    it 'should successfully relate the sprint' do
      @user.sprints.length.should == 1
    end
    
  end
  
  describe " as related to it's notes" do
  
    it "" do
    end
    
  end
  
end
