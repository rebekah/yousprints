require 'spec_helper' 

describe SprintsController do

  describe "a POST request from the intial sprint info form" do
  
    before do
     login_test_user
    end
    
    it 'when recieve a properly formatted post request, it will create a new Sprint object' do 
      expect {post :create, {format: 'json', sprint: { duration: 10, intention: "foobar"}} }.to change{Sprint.count}.by(1)
    end
  
    
  end
 
end
