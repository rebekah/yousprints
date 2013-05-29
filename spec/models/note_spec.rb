require 'spec_helper'

describe Note do
  
  before do
    @note = Note.new
  end
  
  describe "Note attributes" do
    
    it {expect{@note.note_text}.to_not raise_error(NameError)}
    it {expect{@note.updated_at}.to_not raise_error(NameError)}
    it {expect{@note.note_type}.to_not raise_error(NameError)}
    
  end
  
  describe "it belongs to a user" do
    before do
      @user = create_test_user
      @user.notes << @note
    end
    
    it { @note.user.should == @user }
  end 
  
  describe "default_types" do
    it {Note.default_types.should == {sprint_brain_dump: 'Sprint Brain Dump', reminders: 'Reminders', notes: 'Notes'} }  
  end
  
end
