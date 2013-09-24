require 'spec_helper'

describe "landing pages spec" do

  subject {page}
  
  before do
    @user = login_test_user
  end
  
  describe "the basics" do
  
    before do 
      visit root_path
    end
   
    it "will provide the neccesary link for navigating to the new sprint form" do
        page.should have_selector('a', text: 'Start Sprint')
    end
    
    it "will contain a div to hold flash messages" do
      should have_selector('div')
    end
    
    it "should not have a link to home in the top nav" do
      should_not have_selector('div.navbar div.pull-right a:contains("Home")')
    end
    
    it "should have a link to 'Daily Notes' in the top nav" do
      should have_selector('div.navbar div.pull-right a:contains("Daily Notes")')
    end
    
    context 'clicking the Start Sprint link' do
      
      before do
        click_link('Start Sprint')
      end
      
      it "should route me to the new_sprint_path" do
        current_path.should == new_sprint_path
      end
      
    end
    
    it "will provide the link for navigating to the sprint index page" do
       should have_selector('a[href="/sprints"]') 
    end
    
    describe "daily notes" do
    
      it "will have an interface for creating 'Daily Notes'" do
        should have_content('Daily Brain Dump')
        should have_selector('textarea#note_content')
        should have_selector('form#daily_notes[data-remote="true"]')
      end 
      
    end
   
  end
  

  describe "with a user that does not have a daily note for today" do
    before do 
      visit root_path
    end
  
    it {should have_selector('form#daily_notes[action="/notes"]')}
  end


  describe "with a user that has a daily note for today" do
    before do 
      note_type = NoteType.where(name: 'daily_notes')[0]    
      @user.notes << Note.new(note_type: note_type)
      @user.save
      visit root_path
    end
    it 'should make an update form rather than a create form' do
      should have_selector('form#daily_notes input[type="hidden"][value="put"]')
    end
  end
  
end


