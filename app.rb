require "sinatra"

get '/' do
  content_type :html, 'charset' => 'utf-8'
  send_file "public/repl.html"
end