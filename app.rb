require 'sinatra'
require 'haml'
require 'rest_client'
require 'json'
require 'google/api_client'
require 'ohm'
require './lib.rb'

set :haml, :format => :html5
enable :sessions

#set to default for dev since will not last with shotgun
set :session_secret, ENV['SESSION_KEY'] || 'super secret key'

configure :production do
  require 'newrelic_rpm'
end

before do
  Ohm.connect :url => ENV['REDISTOGO_URL']
  if not session[:email] || request.path_info =~ /^\/oauth2/
    redirect(url('/oauth2authorize'))
  end
end

def get_client
  client = Google::APIClient.new
  client.authorization.client_id = ENV['GOOGLE_CLIENT_ID']
  client.authorization.client_secret = ENV['GOOGLE_SECRET']
  client.authorization.scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
  client.authorization.redirect_uri = to('/oauth2callback')
  client.authorization.code = params[:code] if params[:code]
  client
end

get '/oauth2authorize' do
  client=get_client
  redirect client.authorization.authorization_uri.to_s, 303
end

get '/oauth2callback' do
  client=get_client
  client.authorization.fetch_access_token!
  google_token=client.authorization.access_token
  user = JSON.parse(RestClient.get('https://www.googleapis.com/oauth2/v1/userinfo',
                 :authorization=>"Bearer #{google_token}"))

  session[:google_token] = google_token
  session[:email] = user["email"]
  puts "saved user email? #{user.inspect} token #{google_token}"
  redirect to('/')
end

get '/' do
  @email=session[:email]
  haml :index
end

get '/session' do
  "hi kyle, session is #{session.inspect}"
end

post "/make" do
  @something=params[:hi]
  session[:hi]=@something
  status 400 if @something=='kyle'

  #redirect url("/")
  haml :index
end
