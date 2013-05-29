class SprintsController < ApplicationController
  
  def new
    @sprint = Sprint.new
  end
  
end
