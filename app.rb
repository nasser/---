# encoding: utf-8

require "sinatra"

configure do
  mime_type :peg, 'text/peg'
  mime_type :'قلب', 'text/قلب'
end

get '/' do
  content_type :html, 'charset' => 'utf-8'
  send_file "public/repl.html"
end