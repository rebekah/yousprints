class Sprint
  
  include Mongoid::Document
  
  field :administration_start, type: Time
  field :administration_end, type: Time
  field :optimistic, type: String
  field :realistic, type: String
  field :sprint_start, type: Time
  field :percent_of_optimistic, type: Integer
  field :result, type: String
  field :next_steps, type: String
  
  belongs_to :user
  embeds_many :sub_tasks
  attr_accessible :sub_tasks
  
end

  #interuptions int
  #off_focus int
  #secondary feature - pause array ex.[start_pause_time, end_pause_time, start_pause_time, end_pause_time]
  #focus_intensity_score float
  #focus_distractibility_score float

