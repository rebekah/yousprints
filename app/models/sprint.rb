class Sprint
  
  include Mongoid::Document
  
  field :administration_start, type: Time
  field :administration_end, type: Time
  field :capacity, type: Integer
  field :duration, type: Integer
  field :intention, type: String
  field :sprint_start, type: Time
  field :percent_of_optimistic, type: Integer
  field :result, type: String
  field :next_steps, type: String
  
  belongs_to :user
  embeds_many :sub_processes
  attr_accessible :sub_processes, :notes, :duration, :intention
  has_many :notes
  
  def add_sub_process_from_params_hash(params)
    
  end
  
end

  #interuptions int
  #off_focus int
  #secondary feature - pause array ex.[start_pause_time, end_pause_time, start_pause_time, end_pause_time]
  #focus_intensity_score float
  #focus_distractibility_score float

