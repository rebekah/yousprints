class LandingController < ApplicationController
  
  def index
    if ! current_user.nil? && !current_user.latest_daily_note.nil? && current_user.latest_daily_note.created_at.to_date == Time.now.utc.to_date
      @note = current_user.latest_daily_note
    elsif ! current_user.nil?
      note_type = NoteType.where(name: 'daily_notes')[0]
      @note = Note.new(note_type: note_type)
    else
      redirect_to new_user_session_path    
    end
  end

end
