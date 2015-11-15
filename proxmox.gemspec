# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'proxmox/version'

Gem::Specification.new do |spec|
  spec.name          = 'proxmox'
  spec.version       = Proxmox::VERSION
  spec.authors       = ['Nicolas Ledez']
  spec.email         = ['github@ledez.net']
  spec.description   = 'A library to drive a Proxmox host'
  spec.summary       = 'You need to manage a proxmox host with Ruby? This library is for you.'
  spec.homepage      = 'https://github.com/nledez/proxmox'
  spec.license       = 'MIT'

  spec.files         = `git ls-files`.split($INPUT_RECORD_SEPARATOR)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.add_dependency 'rest-client', '>=1.6.7'
  spec.require_paths = ['lib']

  spec.add_development_dependency 'bundler', '~> 1.3'
  spec.add_development_dependency 'rake'
  spec.add_development_dependency 'rspec'
  spec.add_development_dependency 'webmock'
end
