require 'spork'
require 'rspec'

Spork.prefork do
  unless ENV['DRB']
    require 'simplecov'
    SimpleCov.start 'rails'
  end
end

Spork.each_run do
  if ENV['DRB']
    require 'simplecov'
    SimpleCov.start 'rails'
  end
end

if ENV["CI"]
  require 'coveralls'
  Coveralls.wear!
end

RSpec.configure do |config|
  config.treat_symbols_as_metadata_keys_with_true_values = true
  config.run_all_when_everything_filtered = true
  config.filter_run :focus

  config.order = 'random'
end
