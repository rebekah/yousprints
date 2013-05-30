class SprintsController < ApplicationController
  
  def new
    @sprint = Sprint.new
    @note = Note.new
    @note.note_type = NoteType.where(name: 'sprint notes')[0]
  end
  
end
