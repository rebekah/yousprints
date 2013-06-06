class SprintsController < ApplicationController
  
  def new
    @sprint = Sprint.create
    @note_sprint_dump = Note.new
    @note_sprint_reminders = Note.new
    @note_sprint_dump.note_type = NoteType.where(name: 'sprint notes')[0]
    @note_sprint_reminders.note_type = NoteType.where(name: 'sprint reminder notes')[0]
    @notes = [@note_sprint_dump, @note_sprint_reminders]
  end
  
  def create  
    respond_to do |format|
      format.json do
        @sprint = Sprint.create(params[:sprint])
        render :json => @sprint
      end
    end
  end
  
  def update
    respond_to do |format|
      format.json do
        render :json => @sprint
      end
    end
  end
  
end
