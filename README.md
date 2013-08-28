# Proxmox

You need to manage a proxmox host with Ruby? This library is for you.

Current build:
[![Build Status](https://travis-ci.org/nledez/proxmox.png)](https://travis-ci.org/nledez/proxmox)
[![Coverage Status](https://coveralls.io/repos/nledez/proxmox/badge.png)](https://coveralls.io/r/nledez/proxmox)
[![Dependency Status](https://gemnasium.com/nledez/proxmox.png)](https://gemnasium.com/nledez/proxmox)
[![Code Climate](https://codeclimate.com/github/nledez/proxmox.png)](https://codeclimate.com/github/nledez/proxmox)

Inspirated from:
https://bitbucket.org/jmoratilla/knife-proxmox/ but I would like to have
the same without chef.
https://github.com/maxschulze/uv_proxmox but listing some task does not
work for me. No tests, use ssh.

So I start to create one fully tested (TDD method).


## Installation

Add this line to your application's Gemfile:

    gem 'proxmox'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install proxmox

## Usage

    require 'awesome_print'
    require 'proxmox'
    
    def wait_status(server1, task)
      puts task
      while server1.task_status(task) == "running"
        puts '.'
        sleep 1
      end
    
      puts server1.task_status(task)
    end
    
    server1 =
    Proxmox::Proxmox.new("https://the-proxmox-server:8006/api2/json/",
    "node", "root", "secret", "pam")
    ap server1.templates
    
    vm1 = server1.openvz_post("ubuntu-10.04-standard_10.04-4_i386", 200)
    wait_status(server1, vm1)
    
    ap server1.openvz_vm_status(200)
    vm1 = server1.openvz_vm_start(200)
    begin
      wait_status(server1, vm1)
    rescue
    end
    sleep 5
    ap server1.openvz_vm_shutdown(200)
    begin
      wait_status(server1, vm1)
    rescue
    end
    sleep 5
    ap server1.openvz_vm_status(200)
    
    vm1 = server1.openvz_delete(200)
    wait_status(server1, vm1)

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Create spec
4. Write your code
5. Check spec & coverage
6. Commit your changes (`git commit -am 'Add some feature'`)
7. Push to the branch (`git push origin my-new-feature`)
8. Create new Pull Request
