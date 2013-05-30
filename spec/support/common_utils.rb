def create_test_user
  FactoryGirl.create(:user)
end


def login_test_user
  user = create_test_user
  login_as user
  user
end

def page!
  save_and_open_page
end
