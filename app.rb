require "sinatra"

set :protection, :except => :frame_options
set :static, true
set :root, File.dirname(__FILE__)

get '/' do
  content_type :html, 'charset' => 'utf-8'
  send_file "public/repl.html"
end