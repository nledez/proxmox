#!/usr/bin/env ruby
require 'json'
require 'awesome_print'

puts '= List of implemented API parts'
puts 'Nicolas Ledez <github.public@ledez.net>'
puts ''

DOC = File.open('apidoc.js').readlines.map{ |l| l.chomp }.join(' ')
API = JSON.parse DOC

PATHS = {}
VERBS = []
VERB_SORT = {
  'GET' => 1,
  'POST' => 2,
  'PUT' => 3,
  'DELETE' => 4
}

class Array
  def sort_verb
    self.sort do |a, b|
      VERB_SORT[a] <=> VERB_SORT[b]
    end
  end
end

def extractinfos(bloc)
  #puts '=' * 80
  #puts bloc.keys
  path = bloc['path']
  PATHS[path] = []
  bloc['info'].each_key do |verb|
    PATHS[path].push verb
  end

  unless bloc['children'].nil?
    bloc['children'].each do |c|
      extractinfos c
    end
  end
end

API.each do |e|
  extractinfos e
end

#puts VERBS.sort_verb
sorted_paths = PATHS.keys.sort_by(&:downcase)

sorted_paths.each do |path|
  PATHS[path].sort_verb.each do |verb|
    puts "- [ ] #{path} #{verb}"
  end
end
