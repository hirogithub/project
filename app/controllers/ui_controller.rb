class UiController < ApplicationController
  def index
    @attr =["住宅地A","住宅地B","新興住宅街","商業地"]
    @cond = ["駅","病院","幼稚園","コンビニ","スーパー"]
    # @pos = {lat: 35,lon: 135}
    # p @pos.to_json

  end
  def test
    render :text  => params
  end
  def commit
    @pos = {
      :lon => params[:lon],
      :lat => params[:lat]
    }
  end
  def connection
    @temp =  params
    p params
  end
end
