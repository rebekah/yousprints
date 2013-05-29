class SubContext
  include Mongoid::Document
  
  field :description, type: String
  field :start_time, type: Time
  field :end_time, type: Time
  
  attr_accessible :sub_contexts, :description
  
  embeds_many :sub_contexts
  embedded_in :sub_context
  embedded_in :sprint
end
