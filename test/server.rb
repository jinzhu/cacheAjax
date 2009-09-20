require 'rubygems'
require 'sinatra'

set :public, File.dirname(__FILE__)
set :views,  File.dirname(__FILE__) + '/templates'

get '/' do
  erb :index
end

get '/ajax' do
  'ok'
end
