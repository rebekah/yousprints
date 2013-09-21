class NotesController < ApplicationController
  
  def create
    note_type = NoteType.where(name: 'daily_notes')[0]
    note = Note.new(params[:note], note_type: note_type)
    current_user.notes << note
    current_user.notes.last.note_type = NoteType.where(name: 'daily_notes')[0]
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
