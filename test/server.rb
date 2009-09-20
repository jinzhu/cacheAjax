require 'rubygems'
require 'sinatra'

set :public, File.dirname(__FILE__) + '/assets'
set :views,  File.dirname(__FILE__) + '/templates'

get '/index' do
  erb :index
end
