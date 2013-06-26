require 'spec_helper'

describe SubProcess do

  before do
    @sub_process = SubProcess.new
  end

  describe SubProcess do
  
    it {expect{@sub_process.sibling_level}.to_not raise_error(NameError)}
    it {expect{@sub_process.description}.to_not raise_error(NameError)}
    it {expect{@sub_process.duration}.to_not raise_error(NameError)}
    it {expect{@sub_process.pause_duration}.to_not raise_error(NameError)}
  
  end

end
