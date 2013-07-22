class SprintsController < ApplicationController
  
  def new
    @sprint = Sprint.new
    @note_sprint_dump = Note.new
    @note_sprint_reminders = Note.new
    @note_sprint_dump.note_type = NoteType.where(name: 'sprint_notes')[0]
    @note_sprint_reminders.note_type = NoteType.any_of({name: /reminder/})[0]
    @notes = [@note_sprint_dump, @note_sprint_reminders]
    @notes.each do |note|
      @sprint.notes << note
    end
  end
  
  def create
    respond_to do |format|
      format.json do
        @sprint = Sprint.new(params[:sprint])
        current_user.sprints << @sprint
        render :json => @sprint
      end
    end
  end
  
  def update
    @sprint = current_user.sprints.find(params[:id])
    respond_to do |format|
      format.json do
        if ! params[:sub_processes].nil?
          sub_processes_hash = ActiveSupport::JSON.decode(params[:sub_processes])
          @sprint.create_sub_processes_from_hash(sub_processes_hash)
        elsif ! params[:sprint][:duration].nil?
          @sprint.update_attributes(params[:sprint])  
        end
        render :json => @sprint
      end
      format.js do
        if ! params[:sprint][:interruptions].nil?
          @sprint.update_attributes(params[:sprint] )
        end
      end
      format.html do
        if ! params[:sprint][:percentage_complete].nil?
          @sprint.update_attributes(params[:sprint] )       
          redirect_to new_sprint_path, notice: 'Your sprint has been successfully submitted'
        end
      end
    end
  end     
  
end
