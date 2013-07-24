require 'spec_helper'

describe Proxmox do
  it 'should have a version number' do
    Proxmox::VERSION.should_not be_nil
  end

  it 'should do something useful' do
    false.should be_true
  end
end
