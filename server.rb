require 'rubygems'
require 'sinatra'
require 'json'

set :public, File.dirname(__FILE__)
set :views,  File.dirname(__FILE__) + '/templates'

get '/' do
  erb :index
end

get '/ajax' do
  sleep(params[:wait].to_i) if params[:wait]
  'ok(true, "ajax call back")'
end

get '/json' do
  JSON.generate({:name => 'jinzhu',:sex => 'm',:email => 'wosmvp@gmail.com'})
end
