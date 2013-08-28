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

At this time check specs to have code samples.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Create spec
4. Write your code
5. Check spec & coverage
6. Commit your changes (`git commit -am 'Add some feature'`)
7. Push to the branch (`git push origin my-new-feature`)
8. Create new Pull Request
