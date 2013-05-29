class SubTask
  include Mongoid::Document
  
  field :description, type: String
  field :start_time, type: Time
  field :end_time, type: Time
  
  attr_accessible :sub_tasks, :description
  
  embeds_many :sub_tasks
  embedded_in :sub_task
  embedded_in :task
end
