require 'spec_helper' 

describe SprintsController do

  describe "a POST request from the intial sprint info form" do
  
    before do
     @user = login_test_user
     controller.stub(:current_user) { @user }
    end
    
    it 'when it recieves a properly formatted post request, it will create a new sprint object owned by the user' do 
      expect {post :create, {format: 'json', sprint: { duration: 10, intention: "foobar"}} }.to change{@user.sprints.all.count}.by(1)
    end
  
    
  end
 
end
