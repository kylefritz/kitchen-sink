require 'sinatra'
require 'haml'
require 'ohm'
require './lib.rb'

set :haml, :format => :html5

configure :production do
  require 'newrelic_rpm'
end

before do
  Ohm.connect :url => ENV['REDISTOGO_URL']
end

get "/" do
  haml :index
end

post "/make" do
  @something=params[:hi]

  status 400 if @something=='kyle'

  #redirect url("/")
  haml :index
end
