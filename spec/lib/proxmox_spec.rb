require 'spec_helper'
require 'webmock/rspec'

describe Proxmox do
  it 'should connect to Proxmox server' do
    stub_request(:post, "http://localhost:8006/api2/json/access/ticket").with(
      :body => {
        "username" => "root",
        "password" => "secret",
        "realm" => "pam"
      },
      :headers => {
        'Content-Type' => 'application/x-www-form-urlencoded',
        'User-Agent' => 'Ruby'
      }
    ).to_return(
      :status => 200,
      :headers => {
        :connection => "close",
        :server => "pve-api-daemon/3.0",
        :content_type => "application/json;charset=UTF-8",
      },
      :body => '{"data":{"cap":{"dc":{"Sys.Audit":1},"access":{"Group.Allocate":1,"User.Modify":1},"nodes":{"Sys.Audit":1,"Sys.Syslog":1,"Sys.Console":1,"Sys.Modify":1,"Sys.PowerMgmt":1},"vms":{"VM.Backup":1,"VM.Allocate":1,"VM.Config.CPU":1,"VM.Config.Network":1,"VM.Migrate":1,"VM.Config.Memory":1,"VM.Config.Options":1,"Permissions.Modify":1,"VM.Monitor":1,"VM.Console":1,"VM.Config.Disk":1,"VM.Config.HWType":1,"VM.Clone":1,"VM.Snapshot":1,"VM.Audit":1,"VM.PowerMgmt":1,"VM.Config.CDROM":1},"storage":{"Datastore.AllocateTemplate":1,"Datastore.Allocate":1,"Datastore.Audit":1,"Permissions.Modify":1,"Datastore.AllocateSpace":1}},"CSRFPreventionToken":"51F00E60:Pnd0AHehuTE++j87nUz0nLuyW+0","ticket":"PVE:root@pam:51F00E60::OS5lBKlaabgnmekdbVY2JYAbd5Z/MPWCeZ9b33UwjsE1yVB1esIwUQoXJ4Xgb/+UVE9mtS2K3dJ65wyPDsGYTDc0TCl0VmdOGz7djXMlMy5ShRjXcX/GLs77LHXlLQOO+ED/jCoz0tHV55igNSBNMG2UrSLlTGvgm8zf1fNqAsVszrAWgeFu+e/1CLIfs//cWyimBuDx+r3m/NOjaoyeb2u63eBCPrWyEiCJZniMZDVnqqQcOm32tE2XQj4D2LS+xaHn2fdZDlcAo0uY4qVspKiMjf9g2AudRblkobCTf7KdhanIm0kCSqkvHJy2EMcAbxcqnGnjPiYSH0WYZMTnlA==","username":"root@pam"}}'
    )
    stub_request(:post, "http://localhost:8006/api2/json/access/ticket").with(
      :body => {
        "username" => "root",
        "password" => "bad",
        "realm" => "pam"
      },
      :headers => {
        'Content-Type' => 'application/x-www-form-urlencoded',
        'User-Agent' => 'Ruby'
      }
    ).to_return(
      :status => 500,
      :headers => {
        :connection => "close",
        :server => "pve-api-daemon/3.0",
        :content_type => "application/json;charset=UTF-8",
      },
      :body => '{"data":null}'
    )
    server1 = Proxmox::Proxmox.new("http://localhost:8006/api2/json/", "localhost", "root", "secret", "pam")
    server1.status.should == "connected"

    server2 = Proxmox::Proxmox.new("http://localhost:8006/api2/json/", "localhost", "root", "bad", "pam")
    server2.status.should == "error"
  end
end
