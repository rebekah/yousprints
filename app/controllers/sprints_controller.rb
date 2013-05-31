class SprintsController < ApplicationController
  
  def new
    @sprint = Sprint.new
    @note = Note.new
    @note.note_type = NoteType.where(name: 'sprint notes')[0]
  end
  
  def create
    
    respond_to do |format|
      format.json do
        @sprint = Sprint.create(params[:sprint])
        render :json => @sprint
      end
    end
  end
  
end
