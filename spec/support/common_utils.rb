def login_test_user
  user = User.create(email: "test_user@example.com", password: "password", password_confirmation: "password")
  login_as user
  user
end

def page!
  save_and_open_page
end
