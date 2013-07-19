class Note
  
  include Mongoid::Document
  
  field :created_at, type: Time, default: Time.now
  field :updated_at, type: Time
  field :content, type: String

  belongs_to :user
  belongs_to :sprint
  
  attr_accessible :note_type, :content
  
  has_one :note_type
  
end
