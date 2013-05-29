# Read about factories at https://github.com/thoughtbot/factory_girl

password = 'password'
name = Faker::Name.name

FactoryGirl.define do
  factory :user do
    email { "#{name.downcase.gsub(/\.| /,'_').gsub(/_{2}/,'_')}@#{Faker::Internet.domain_name}" }
    password password
    password_confirmation password
    confirmed_at Time.now
  end
end
