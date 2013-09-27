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
    it {expect{@sprint.percentage_complete}.to_not raise_error(NameError)}
    it {expect{@sprint.result}.to_not raise_error(NameError)}
    it {expect{@sprint.next_steps}.to_not raise_error(NameError)}
    
  end
  
  describe "create_sub_process_from_hash" do
  
    context 'when we pass in hash that should create one sub_process without any children sub_processes' do
    
      before do
        @sprint = Sprint.new
        @sub_processes_hash = {"sub_processes"=>[{"position"=>"_0", "description"=>"", "duration"=>0}]}
        @sprint.create_sub_processes_from_hash(@sub_processes_hash)
      end
    
      it 'will create one child sub_process with the expected attribute values' do 
        sub_process_length = @sprint.sub_processes.where(duration: 0, description: '').length
        (sub_process_length).should ==  1
      end
      
    end
     
    context 'when we pass in hash that should create one sub_process that has one child sub_processes' do
      
      before do
       @sprint = Sprint.new
       @sub_processes_hash = {"sub_processes"=>[{"position"=>"_0", "description"=>"", "duration"=>0, "sub_processes" => [{"position"=>"_0", "description"=>"", "duration"=>0}]}]}
       @sprint.create_sub_processes_from_hash(@sub_processes_hash)
      end
      
      it 'will create a child sub_process that has a child sub_process' do 
        sub_process_length = @sprint.sub_processes.where(duration: 0, description: '')[0].sub_processes.where(duration: 0, description: '').length
        (sub_process_length).should ==  1
      end
      
    end
    
    context 'when we pass in hash that should create two sub_process' do
    
      before do
        @sprint = Sprint.new
        @sub_processes_hash = {"sub_processes"=>[{"position"=>"_0", "description"=>"", "duration"=>0},{"position"=>"_0", "description"=>"", "duration"=>0}]}
        @sprint.create_sub_processes_from_hash(@sub_processes_hash)
      end
    
      it 'will create two children sub_process with the expected attribute values' do 
        sub_process_length = @sprint.sub_processes.where(duration: 0, description: '').length
        (sub_process_length).should ==  2
      end
      
    end 

    context 'when we pass in hash that should create two sub_process, with the first having two children sub_process, with the first of those having a child sub_process of its own' do
    
      before do
        @sprint = Sprint.new
        @sub_processes_hash = {
          "sub_processes"=> 
          [
            {
              "position"=> "_0",
              "description"=> "some description",
              "duration"=> 11,
              "pause_duration"=> 1,
              "sub_processes"=>
              [
                {
                  "position"=> "_0_0",
                  "description"=> "",
                "duration"=> 10,
                "pause_duration"=> 1
                },
                {
                  "position"=> "_0_1",
                  "description"=> "",
                "duration"=> 12,
                "pause_duration"=> 1,
                  "sub_processes"=>
                  [
                    {
                      "position"=> "_0_1_0",
                        "description"=> "some description",
                "duration"=> 10,
                "pause_duration"=> 1
                    }
                  ]
                }
              ]
            },
            {
              "position"=> "_1",
              "description"=> "some description",
              "duration"=> 10,
              "pause_duration"=> 1
            }
          ]
        }
        @sprint.create_sub_processes_from_hash(@sub_processes_hash)
      end
    
      it 'will create two children sub_processes' do 
        sub_process_length = @sprint.sub_processes.all.length
        (sub_process_length).should ==  2
      end
      
      it 'will create a child sub_process with two children' do 
        sub_process1_children_length = @sprint.sub_processes.where(duration: 11, description: 'some description')[0].sub_processes.all.length
        (sub_process1_children_length).should ==  2
      end
      
      it 'will create a child sub_process that has a child_sub_process that has a child sub_process' do
        the_sub_processes1_sub_processes1_child_length = @sprint.sub_processes.where(duration: 11)[0].sub_processes.where(duration:12)[0].sub_processes.all.length
        (the_sub_processes1_sub_processes1_child_length).should == 1
      end
              
    end 
  
  end
  
  describe "sprint_graph_date" do
    before do 
      @user = login_test_user
      sprint1 = Sprint.create
      sprint1.created_at = sprint1.created_at - 2.days
      @user.sprints << sprint1
      @user.sprints << Sprint.create
    end
    
    it "should return the proper hash" do
      sprints = Sprint.getSprintsInDateRange("this_week", @user.id)
      sprints.should_not be_nil
    end
  end
   
end
