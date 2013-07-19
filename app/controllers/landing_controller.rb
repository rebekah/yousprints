class LandingController < ApplicationController
  
  def index
    if ! current_user.nil? && current_user.notes.count > 0 && current_user.notes.last.created_at.to_date == Time.now.utc.to_date
      @note = current_user.notes.last
    elsif ! current_user.nil?
      @note = Note.new
      @note.note_type = NoteType.where(name: 'daily_notes')[0]
    else
      redirect_to new_user_session_path    
    end
  end

end
