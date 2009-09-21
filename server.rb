require 'rubygems'
require 'sinatra'
require 'json'

set :public, File.dirname(__FILE__)
set :views,  File.dirname(__FILE__) + '/templates'

get '/' do
  erb :index
end

get '/script' do
  sleep(params[:wait].to_i) if params[:wait]
  'ok(true, "ajax call back")'
end

get '/json' do
  JSON.generate({:name => 'jinzhu',:sex => 'm',:email => 'wosmvp@gmail.com'})
end

get '/xml' do
  content_type 'text/xml', :charset => 'utf-8'
  builder do |xml|
    xml.instruct!(:xml, :version => '1.1', :encoding => 'UTF-8')
    xml.person do
      xml.name "Jinzhu"
      xml.email 'wosmvp@gmail.com'
    end
  end
end
