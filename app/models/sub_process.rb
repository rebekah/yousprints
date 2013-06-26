class SubProcess

  include Mongoid::Document
  
  field :description, type: String
  field :sibling_level, type: Integer
  field :duration, type: Integer
  field :pause_duration, type: Integer
  
  attr_accessible :sibling_level, :duration, :pause_duration, :description
  
  embeds_many :sub_processes
  embedded_in :sub_process
  embedded_in :sprint
  
end
