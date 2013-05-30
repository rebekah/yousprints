class LandingController < ApplicationController
  
  def index
    if !current_user
      #user = User.new
      redirect_to new_user_session_path
    end
    @note = Note.new()
    @note.note_type = NoteType.where(name: 'daily notes')[0]
  end

end
