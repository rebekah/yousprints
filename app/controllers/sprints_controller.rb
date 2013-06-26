class SprintsController < ApplicationController
  
  def new
    @sprint = Sprint.new
    @note_sprint_dump = Note.new
    @note_sprint_reminders = Note.new
    @note_sprint_dump.note_type = NoteType.where(name: 'sprint_notes')[0]
    @note_sprint_reminders.note_type = NoteType.any_of({name: /reminder/})[0]
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
    @sprint = Sprint.find(params[:id])
    sub_processes_hash = ActiveSupport::JSON.decode(params[:sub_processes])
    @sprint.create_sub_processes_from_hash(sub_processes_hash)
    respond_to do |format|
      format.json do
        render :json => @sprint
      end
    end
  end
  
end
