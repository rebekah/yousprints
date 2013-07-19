require 'spec_helper' 

describe NotesController do

  describe "a POST request from the daily dump form" do
  
    before do
     @user = login_test_user
    end
    
    it 'when recieve a properly formatted post request, it will create a new Note object' do 
      controller.stub(:current_user) { @user }
      expect {post :create, {format: 'json', note: { content: 'foobar'}}}.to change{@user.notes.count}.by(1)
    end
    
    it 'when recieve a properly formatted post request, it will create a new Note object of type daily_notes', :focus do 
      controller.stub(:current_user) { @user }
      post :create, {format: 'json', note: { content: 'foobar'}}
      (@user.notes.last.note_type.name).should eq('daily_notes')
    end
    
  end
 
end
