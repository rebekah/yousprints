require 'spec_helper'

describe Sprint do
  
  before do
    @sprint = Sprint.new
  end
  
  describe "Sprint attributes" do
    
    it {expect{@sprint.administration_start}.to_not raise_error(NameError)}
    it {expect{@sprint.administration_end}.to_not raise_error(NameError)}
    it {expect{@sprint.intention}.to_not raise_error(NameError)}
    it {expect{@sprint.sprint_start}.to_not raise_error(NameError)}
    it {expect{@sprint.percent_of_optimistic}.to_not raise_error(NameError)}
    it {expect{@sprint.result}.to_not raise_error(NameError)}
    it {expect{@sprint.next_steps}.to_not raise_error(NameError)}
    
  end
  
  
end
