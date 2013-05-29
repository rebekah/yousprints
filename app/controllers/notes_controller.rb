class NotesController < ApplicationController
  
  def create
    note = Note.new(params[:note])
    note.save
    redirect_to root_path
  end
  
end
