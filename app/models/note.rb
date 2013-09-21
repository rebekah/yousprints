class Note
  
  include Mongoid::Document
  
  field :created_at, type: Time, default: Time.now
  field :updated_at, type: Time
  field :content, type: String

  belongs_to :user
  belongs_to :sprint
  belongs_to :note_type
  
  attr_accessible :user, :sprint, :note_type, :content
  
  validates :note_type, presence: true
  
end
