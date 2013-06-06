class SubProcess
  include Mongoid::Document
  
  field :description, type: String
  
  embedded_in :sprint
  
  
end
