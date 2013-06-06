#!/usr/bin/env rake
# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Yousprints::Application.load_tasks




namespace :db do
  namespace :seed do
    
    note_type_seed_data = [
      {
         name: 'daily_notes',
         description: '',
         label: 'Daily Brain Dump',
         button_label: ''
      },
      {
         name: 'sprint_reminder_notes',
         description: '',
         label: 'Personal Reminders',
         button_label: ''
      },
      {
         name: 'sprint_notes',
         description: '',
         label: 'Sprint Brain Dump',
         button_label: ''
      },
    ]
      
    task :populate_note_types => :environment do
      puts 'removing all note type records'
      NoteType.all.destroy
      puts 'creating default note type records'
      note_type_seed_data.each do |note_type|
        NoteType.create(name: note_type[:name], description: note_type[:description], label: note_type[:label], button_label: note_type[:button_label] )
      end
    end
  end
end
