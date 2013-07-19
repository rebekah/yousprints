require 'spec_helper'

describe LandingController do
  
  before do
   @user = login_test_user
  end
  
  describe "index" do
  
    context "when there is not a daily note record for this user" do
    
      it "will assign a new note" do
        controller.stub(:current_user) { @user }
        get :index
        (assigns(:note)).should_not be_nil
      end
      
      it "without a user_id value" do
        controller.stub(:current_user) { @user }
        get :index
        (assigns(:note).user).should be_nil
      end
      
    end
    
    context "when there is a daily note record created today" do
    
      before do
        @user.notes << Note.new
      end
    
      it "will assign a new note" do
        controller.stub(:current_user) { @user }
        get :index
        (assigns(:note)).should_not be_nil
      end
      
      it "with a user_id value" do
        controller.stub(:current_user) { @user }
        get :index
        (assigns(:note).user).should_not be_nil
      end
      
    end
    
    context "when there is a daily note record created two days ago" do
    
      before do
        @user.notes << Note.new
        @user.notes.first.created_at = 2.days.ago
      end
    
      it "will assign a new note" do
        controller.stub(:current_user) { @user }
        get :index
        (assigns(:note)).should_not be_nil
      end
      
      it "with a user_id value" do
        controller.stub(:current_user) { @user }
        get :index
        (assigns(:note).user).should be_nil
      end
      
    end
    
  end


end
