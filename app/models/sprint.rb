require 'time_helper'
class Sprint
  
  include Mongoid::Document
  include Mongoid::Timestamps
  
  
  field :administration_start, type: Time
  field :administration_end, type: Time
  field :focus_intensity, type: Integer
  field :happiness, type: Integer
  field :duration, type: Integer
  field :intention, type: String
  field :sprint_start, type: Time
  field :percentage_complete, type: Integer
  field :result, type: String
  field :next_steps, type: String
  field :interruptions, type: Integer
  field :loss_of_focus_count, type: Integer
  
  belongs_to :user
  embeds_many :sub_processes
  attr_accessible :sub_processes, :notes, :duration, :intention, :interruptions, :loss_of_focus_count, :happiness, :focus_intensity, :percentage_complete
  has_many :notes
  
  def create_sub_processes_from_hash(sub_processes_hash)
    sub_processes_hash["sub_processes"].each do |sub_process|
      create_sub_processes('.sub_processes',sub_process)
    end
  end
  
  def self.getSprintsInDateRange(date_range)
    end_date = today = Date.today
    case date_range
    when "this_week"
      start_date = today.beginning_of_week
    when "this_month"
      start_date = today.beginning_of_month  
    when "last_week"
      end_date = today.beginning_of_week - 1.day 
      start_date = end_date.beginning_of_week
    when "last_month"
      end_date = today.beginning_of_month - 1.day 
      start_date = end_date.beginning_of_month
    end
    Sprint.sprint_graph_data(start_date,end_date)   
  end
  
  def get_military_decimal_time
    time = Time.parse(created_at.in_time_zone("Pacific Time (US & Canada)").to_s)
    hour = time.hour
    decimal_minute = (time.min.to_f / 60 ).round(2)
    hour + decimal_minute
  end

  private
  
  def self.sprint_graph_data(start_date,end_date)
    num_days = TimeHelper.difference_in_days(start_date, end_date) + 1
    sprint_graph_info = []
    num_days.times do |i|
      this_day = start_date + i.days 
      this_label = this_day.strftime('%b %-d')
      sprints = Sprint.where(created_at: this_day.beginning_of_day..this_day.end_of_day)
      munged_sprint_data = sprints.map {|sprint| {time: sprint.get_military_decimal_time, percentage_complete: sprint.percentage_complete, focus_intensity: sprint.focus_intensity, happiness: sprint.happiness, interruptions: sprint.interruptions, duration: sprint.duration } }
      sprint_graph_info.push({sprints: munged_sprint_data, date: this_day, date_label: this_label}) 
    end
    sprint_graph_info
  end

  def create_sub_processes(query_string, sub_process) 
    sibling_level = sub_process["position"].split('_').pop()
    eval('self' + query_string + ' << SubProcess.new(sibling_level: sibling_level, duration: sub_process["duration"],pause_duration: sub_process["pause_duration"], description: sub_process["description"])')
    if !sub_process["sub_processes"].nil?
      query_string = query_string + ".where(sibling_level: #{sibling_level})[0].sub_processes"
      sub_process["sub_processes"].each do |sub_process|
        create_sub_processes(query_string, sub_process)  
      end
    end
  end
  
end

