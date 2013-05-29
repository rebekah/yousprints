require 'spec_helper'

describe User do
  
  describe "relating a sprint to a specific user" do
    
    before do
      @user = login_test_user
      @user.sprints << Sprint.new
    end
    
    it 'should successfully relate the sprint' do
      @user.sprints.length.should == 1
    end
    
  end
  
end
