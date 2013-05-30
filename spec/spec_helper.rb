require 'rubygems'
require 'spork'

#uncomment the following line to use spork with the debugger
#require 'spork/ext/ruby-debug'

# --- Instructions ---
# Sort the contents of this file into a Spork.prefork and a Spork.each_run
# block.
#
# The Spork.prefork block is run only once when the spork server is started.
# You typically want to place most of your (slow) initializer code in here, in
# particular, require'ing any 3rd-party gems that you don't normally modify
# during development.
#
# The Spork.each_run block is run each time you run your specs.  In case you
# need to load files that tend to change during development, require them here.
# With Rails, your application modules are loaded automatically, so sometimes
# this block can remain empty.
#
# Note: You can modify files loaded *from* the Spork.each_run block without
# restarting the spork server.  However, this file itself will not be reloaded,
# so if you change any of the code inside the each_run block, you still need to
# restart the server.  In general, if you have non-trivial code in this file,
# it's advisable to move it into a separate file so you can easily edit it
# without restarting spork.  (For example, with RSpec, you could move
# non-trivial code into a file spec/support/my_helper.rb, making sure that the
# spec/support/* files are require'd from inside the each_run block.)
#
# Any code that is left outside the two blocks will be run during preforking
# *and* during each_run -- that's probably not what you want.
#
# These instructions should self-destruct in 10 seconds.  If they don't, feel
# free to delete them.


Spork.prefork do
  # Loading more in this block will cause your tests to run faster. However,
  # if you change any configuration or code from libraries loaded here, you'll
  # need to restart spork for it take effect. 
  require 'simplecov'
  SimpleCov.start
  
  ENV["RAILS_ENV"] = 'test'
  require File.expand_path("../../config/environment", __FILE__)  
  require 'rspec/rails'
  require 'email_spec'
  require 'rspec/autorun'
  require 'rspec/mocks'
  require 'cancan/matchers'
  require 'capybara/rspec'
  require 'capybara/rails'
  
  include Devise::TestHelpers
  
  # gives us the login_as(@user) method when request object is not present
  include Warden::Test::Helpers
  Warden.test_mode!
  
    
  RSpec.configure do |config|
    config.include(EmailSpec::Helpers)
    config.include(EmailSpec::Matchers)
    
    Capybara.register_driver :selenium_chrome do |app|
      Capybara::Selenium::Driver.new(app, browser: :chrome)
    end
  
    # If true, the base class of anonymous controllers will be inferred
    # automatically. This will be the default behavior in future versions of
    # rspec-rails.
    config.infer_base_class_for_anonymous_controllers = false
    config.treat_symbols_as_metadata_keys_with_true_values = true
    config.run_all_when_everything_filtered = true

    require 'database_cleaner'
    config.before(:suite) do
      ActionMailer::Base.deliveries.clear
      Capybara.default_driver = :rack_test
      DatabaseCleaner.strategy = :truncation, {except: ['note_types']}
      DatabaseCleaner.orm = 'mongoid'
      `rake db:seed:populate_note_types RAILS_ENV=test`
    end
  
    config.before(:each) do
      DatabaseCleaner.start
      if example.metadata[:js]        
        Capybara.current_driver = :selenium_chrome
      elsif example.metadata[:rack]
        Capybara.current_driver = rack_test
      end
    end
    
    config.after(:each) do
      DatabaseCleaner.clean
      Warden.test_reset!
      Capybara.use_default_driver
    end

    # Needed for Spork 
    ActiveSupport::Dependencies.clear
    
  end
  
  
end

Spork.each_run do
  # This code will be run each time you run your specs.
    Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}
    load "#{Rails.root}/config/routes.rb"
end



