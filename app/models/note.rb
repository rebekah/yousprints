class Note
  
  include Mongoid::Document
  
  field :created_at, type: Time, default: Time.now
  field :updated_at, type: Time
  field :note_text, type: String
  field :note_type, type: String

  belongs_to :user
  belongs_to :sprint
  
  def self.default_types
    return {
      sprint_brain_dump: 'Sprint Brain Dump', reminders: 'Reminders', notes: 'Notes'
    }   
  end
  
end
