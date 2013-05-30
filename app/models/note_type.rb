class NoteType
  include Mongoid::Document
  
  field :name, type: String
  field :description, type: String
  field :label, type: String
  field :button_label, type: String
  
  belongs_to :note
  
end
