class NotesController < ApplicationController

  def index
   note_type_id = NoteType.where(name: 'daily_notes').first.id
   @time_zone = !current_user.time_zone.nil? ? current_user.time_zone : "Pacific Time (US & Canada)"
   @notes = current_user.notes.where(note_type_id: note_type_id)
  end
  
  def create
    note = Note.new(params[:note])
    note_type = NoteType.where(name: 'daily_notes')[0]
    note.note_type = note_type
    current_user.notes << note
    @note = current_user.notes.last
    current_user.save
    respond_to do |format|
      format.js {}
    end
  end
  
  def update
    current_user.notes.find(params[:id]).update_attributes(content: params[:note][:content])
  end
  
end
