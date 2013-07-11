class Sprint
  
  include Mongoid::Document
  
  field :administration_start, type: Time
  field :administration_end, type: Time
  field :focus_intensity, type: Integer
  field :focus_consistency, type: Integer
  field :duration, type: Integer
  field :intention, type: String
  field :sprint_start, type: Time
  field :percentage_complete, type: Integer
  field :result, type: String
  field :next_steps, type: String
  field :interruptions, type: Integer
  field :loss_of_focus_count, type: Integer
  
  belongs_to :user
  embeds_many :sub_processes
  attr_accessible :sub_processes, :notes, :duration, :intention, :interruptions, :loss_of_focus_count, :focus_consistency, :focus_intensity, :percentage_complete
  has_many :notes
  
  def create_sub_processes_from_hash(sub_processes_hash)
    sub_processes_hash["sub_processes"].each do |sub_process|
      create_sub_processes('.sub_processes',sub_process)
    end
  end
  
  private

  def create_sub_processes(query_string, sub_process) 
    sibling_level = sub_process["position"].split('_').pop()
    eval('self' + query_string + ' << SubProcess.new(sibling_level: sibling_level, duration: sub_process["duration"],pause_duration: sub_process["pause_duration"], description: sub_process["description"])')
    if !sub_process["sub_processes"].nil?
      query_string = query_string + ".where(sibling_level: #{sibling_level})[0].sub_processes"
      sub_process["sub_processes"].each do |sub_process|
        create_sub_processes(query_string, sub_process)  
      end
    end
  end
  
end

  #interuptions int
  #off_focus int
  #secondary feature - pause array ex.[start_pause_time, end_pause_time, start_pause_time, end_pause_time]
  #focus_intensity_score float
  #focus_distractibility_score float

