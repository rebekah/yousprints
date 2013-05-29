class LandingController < ApplicationController
  
  def index
    if !current_user
      #user = User.new
      redirect_to new_user_session_path
    end  
    @note = Note.new
    #@note_text = Note.first.note_text.gsub(/\r\n/,"<br />").gsub(/\s\s/,"\&nbsp\;\&nbsp\;")
    #byebug
    #true
  end

end
