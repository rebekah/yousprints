class Note
  
  include Mongoid::Document
  
  field :created_at, type: Time, default: Time.now
  field :updated_at, type: Time
  field :note_text, type: String
  
end
