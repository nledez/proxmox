require 'spec_helper'
require 'webmock/rspec'
require 'proxmox'

describe Proxmox do
  before(:each) do
    @common_headers_in = { 'User-Agent' => 'Ruby',
                           'Cookie' => /.*/,
                           'Csrfpreventiontoken' => /.*/ }
    @common_headers_out = { connection: 'close',
                            server: 'pve-api-daemon/3.0',
                            content_type: 'application/json;charset=UTF-8' }

    # Common auth
    stub_request(:post, 'http://localhost:8006/api2/json/access/ticket').with(
      headers: {
        'Content-Type' => 'application/x-www-form-urlencoded',
        'User-Agent' => 'Ruby'
      },
      body: {
        'username' => 'root',
        'password' => 'secret',
        'realm' => 'pam'
      }
    ).to_return(
      status: 200,
      headers: @common_headers_out,
      body: '{"data":{"cap":{"dc":{"Sys.Audit":1},"access":{"Group.Allocate":1,"User.Modify":1},"nodes":{"Sys.Audit":1,"Sys.Syslog":1,"Sys.Console":1,"Sys.Modify":1,"Sys.PowerMgmt":1},"vms":{"VM.Backup":1,"VM.Allocate":1,"VM.Config.CPU":1,"VM.Config.Network":1,"VM.Migrate":1,"VM.Config.Memory":1,"VM.Config.Options":1,"Permissions.Modify":1,"VM.Monitor":1,"VM.Console":1,"VM.Config.Disk":1,"VM.Config.HWType":1,"VM.Clone":1,"VM.Snapshot":1,"VM.Audit":1,"VM.PowerMgmt":1,"VM.Config.CDROM":1},"storage":{"Datastore.AllocateTemplate":1,"Datastore.Allocate":1,"Datastore.Audit":1,"Permissions.Modify":1,"Datastore.AllocateSpace":1}},"CSRFPreventionToken":"51F00E60:Pnd0AHehuTE++j87nUz0nLuyW+0","ticket":"PVE:root@pam:51F00E60::OS5lBKlaabgnmekdbVY2JYAbd5Z/MPWCeZ9b33UwjsE1yVB1esIwUQoXJ4Xgb/+UVE9mtS2K3dJ65wyPDsGYTDc0TCl0VmdOGz7djXMlMy5ShRjXcX/GLs77LHXlLQOO+ED/jCoz0tHV55igNSBNMG2UrSLlTGvgm8zf1fNqAsVszrAWgeFu+e/1CLIfs//cWyimBuDx+r3m/NOjaoyeb2u63eBCPrWyEiCJZniMZDVnqqQcOm32tE2XQj4D2LS+xaHn2fdZDlcAo0uY4qVspKiMjf9g2AudRblkobCTf7KdhanIm0kCSqkvHJy2EMcAbxcqnGnjPiYSH0WYZMTnlA==","username":"root@pam"}}'
    )

    @server1 = Proxmox::Proxmox.new('http://localhost:8006/api2/json/', 'localhost', 'root', 'secret', 'pam')
  end

  describe 'get' do
    it 'calls http_action_get' do
      expect(@server1).to receive(:http_action_get).with("version", {})
      @server1.get("version")
    end
  end
  
  describe 'post' do
    it 'calls http_action_post' do
      expect(@server1).to receive(:http_action_post).with("version", {})
      @server1.post("version")
    end
  end
  
  describe 'put' do
    it 'calls http_action_put' do
      expect(@server1).to receive(:http_action_put).with("version", {})
      @server1.put("version")
    end
  end
  
  describe 'delete' do
    it 'calls http_action_delete' do
      expect(@server1).to receive(:http_action_delete).with("version")
      @server1.delete("version")
    end
  end
  
  it 'should connect to Proxmox server' do
    # Bad auth
    stub_request(:post, 'http://localhost:8006/api2/json/access/ticket').with(
      headers: {
        'Content-Type' => 'application/x-www-form-urlencoded',
        'User-Agent' => 'Ruby'
      },
      body: {
        'username' => 'root',
        'password' => 'bad',
        'realm' => 'pam'
      }
    ).to_return(
      status: 500,
      headers: @common_headers_out,
      body: '{"data":null}'
    )
    expect(@server1.connection_status).to eq 'connected'

    server2 = Proxmox::Proxmox.new('http://localhost:8006/api2/json/', 'localhost', 'root', 'bad', 'pam')
    expect(server2.connection_status).to eq 'error'
  end

  describe 'task_status' do
    it 'should get task status' do
      # Status done
      stub_request(:get, 'http://localhost:8006/api2/json/nodes/localhost/tasks/UPID:localhost:00051DA0:119EAABB:521CCB19:vzcreate:200:root@pam:/status').with(
        headers: @common_headers_in).to_return(
          status: 200,
          headers: {
            connection: 'close', server: 'pve-api-daemon/3.0', content_type: 'application/json;charset=UTF-8' },
          body: '{"data":{"exitstatus":"OK","status":"stopped","upid":"UPID:localhost:00051DA0:119EAABB:521CCB19:vzcreate:200:root@pam:","node":"localhost","pid":335264,"starttime":1377618713,"user":"root@pam","type":"vzcreate","id":"200","pstart":295611067}}'
        )

      # Status running
      stub_request(:get, 'http://localhost:8006/api2/json/nodes/localhost/tasks/UPID:localhost:00055DDA:11A99D07:521CE71F:vzcreate:200:root@pam:/status').with(
        headers: @common_headers_in).to_return(
          status: 200,
          headers: @common_headers_out,
          body: '{"data":{"status":"running","upid":"UPID:localhost:00055DDA:11A99D07:521CE71F:vzcreate:200:root@pam:","node":"localhost","pid":351706,"starttime":1377625887,"user":"root@pam","type":"vzcreate","id":"200","pstart":296328455}}'
        )

      # Get status
      expect(@server1.task_status('UPID:localhost:00051DA0:119EAABB:521CCB19:vzcreate:200:root@pam:')).to be_eql 'stopped:OK'
      expect(@server1.task_status('UPID:localhost:00055DDA:11A99D07:521CE71F:vzcreate:200:root@pam:')).to be_eql 'running'
    end
  end

  describe 'templates' do
    it 'should get template list' do
      # First template list
      stub_request(:get, 'http://localhost:8006/api2/json/nodes/localhost/storage/local/content').with(
        headers: @common_headers_in).to_return(
          status: 200,
          headers: @common_headers_out,
          body: '{"data":[{"format":"tgz","content":"vztmpl","volid":"local:vztmpl/ubuntu-10.04-standard_10.04-4_i386.tar.gz","size":142126884},{"format":"tgz","content":"vztmpl","volid":"local:vztmpl/ubuntu-12.04-standard_12.04-1_i386.tar.gz","size":130040792}]}'
        )

      expect(@server1.templates).to be_an_instance_of Hash
      expect(@server1.templates.keys.sort).to be_eql ['ubuntu-10.04-standard_10.04-4_i386', 'ubuntu-12.04-standard_12.04-1_i386']
    end
  end

  describe 'openvz_get' do
    it 'should get openvz vm list' do
      # First VM list
      stub_request(:get, 'http://localhost:8006/api2/json/nodes/localhost/openvz').with(
        headers: @common_headers_in).to_return(
          status: 200,
          headers: @common_headers_out,
          body: '{"data":[{"maxswap":536870912,"disk":404037632,"ip":"192.168.1.5","status":"running","netout":272,"maxdisk":4294967296,"maxmem":536870912,"uptime":3847,"swap":0,"vmid":"101","nproc":"10","diskread":0,"cpu":0.00183354942808597,"netin":0,"name":"test2.dummy.tld","failcnt":0,"diskwrite":0,"mem":21303296,"type":"openvz","cpus":1},{"maxswap":536870912,"disk":387186688,"ip":"192.168.1.1","status":"running","netout":272,"maxdisk":4294967296,"maxmem":536870912,"uptime":17120,"swap":0,"vmid":"100","nproc":"17","diskread":0,"cpu":0.000504170031344927,"netin":0,"name":"test.dummy.tld","failcnt":0,"diskwrite":0,"mem":27987968,"type":"openvz","cpus":1}]}'
        )

      # Second VM list
      stub_request(:get, 'http://localhost:8006/api2/json/nodes/otherone/openvz').with(
        headers: @common_headers_in).to_return(
          status: 200,
          headers: @common_headers_out,
          body: '{"data":[{"maxswap":536870912,"disk":404041728,"ip":"192.168.1.5","status":"running","netout":272,"maxdisk":4294967296,"maxmem":536870912,"uptime":6176,"swap":0,"vmid":"101","nproc":"10","diskread":0,"cpu":0.00161487378340585,"netin":0,"name":"test2.dummy.tld","failcnt":0,"diskwrite":0,"mem":21299200,"type":"openvz","cpus":1},{"maxswap":2147483648,"disk":0,"ip":"10.0.0.1","status":"stopped","netout":0,"maxdisk":10737418240,"maxmem":1073741824,"uptime":0,"swap":0,"vmid":"102","nproc":0,"diskread":0,"cpu":0,"netin":0,"name":"test3.other.domain","failcnt":0,"diskwrite":0,"mem":0,"type":"openvz","cpus":2},{"maxswap":536870912,"disk":387194880,"ip":"192.168.1.1","status":"running","netout":272,"maxdisk":4294967296,"maxmem":536870912,"uptime":19449,"swap":0,"vmid":"100","nproc":"17","diskread":0,"cpu":0.000589570582552814,"netin":0,"name":"test.dummy.tld","failcnt":0,"diskwrite":0,"mem":28282880,"type":"openvz","cpus":1}]}'
        )

      expect(@server1.openvz_get).to be_an_instance_of Hash
      expect(@server1.openvz_get.keys.sort).to be_eql %w(100 101)

      server2 = Proxmox::Proxmox.new('http://localhost:8006/api2/json/', 'otherone', 'root', 'secret', 'pam')
      expect(server2.openvz_get).to be_an_instance_of Hash
      expect(server2.openvz_get.keys.sort).to be_eql %w(100 101 102)
    end
  end

  describe 'openvz_post' do
    it 'should create a container' do
      # Create VM
      stub_request(:post, 'http://localhost:8006/api2/json/nodes/localhost/openvz').with(
        body: 'vmid=200&ostemplate=local%3Avztmpl%2Fubuntu-10.04-standard_10.04-4_i386.tar.gz',
        headers: @common_headers_in).to_return(
          status: 200,
          headers: @common_headers_out,
          body: '{"data":"UPID:localhost:00051DA0:119EAABB:521CCB19:vzcreate:200:root@pam:"}'
        )

      stub_request(:post, 'http://localhost:8006/api2/json/nodes/localhost/openvz').with(
        body: 'hostname=vm1.domain.com&password=secret&memory=512&swap=512&disk=4&vmid=203&ostemplate=local%3Avztmpl%2Fubuntu-10.04-standard_10.04-4_i386.tar.gz',
        headers: @common_headers_in).to_return(
          status: 200,
          headers: @common_headers_out,
          body: '{"data":"UPID:localhost:00051DA0:119EAABC:521CCB19:vzcreate:203:root@pam:"}'
        )

      stub_request(:post, 'http://localhost:8006/api2/json/nodes/localhost/openvz').with(
        body: 'vmid=204&ostemplate=local%3Avztmpl%2Fubuntu-10.04-standard_10.04-4_i386.tar.gz',
        headers: @common_headers_in).to_return(
          status: 500,
          headers: { connection: 'close', server: 'pve-api-daemon/3.0', content_type: 'application/json;charset=UTF-8'
          },
          body: 'NOK: error code = 500'
        )

      # Create the vm
      expect(@server1.openvz_post('ubuntu-10.04-standard_10.04-4_i386', 200)).to be_eql 'UPID:localhost:00051DA0:119EAABB:521CCB19:vzcreate:200:root@pam:'
      expect(@server1.openvz_post('ubuntu-10.04-standard_10.04-4_i386', 203, 'hostname' => 'vm1.domain.com', 'password' => 'secret', 'memory' => 512, 'swap' => 512, 'disk' => 4)).to be_eql 'UPID:localhost:00051DA0:119EAABC:521CCB19:vzcreate:203:root@pam:'
      expect(@server1.openvz_post('ubuntu-10.04-standard_10.04-4_i386', 204)).to be_eql 'NOK: error code = 500'
    end
  end

  describe 'openvz_delete' do
    it 'should delete openvz container' do
      # Delete VM
      stub_request(:delete, 'http://localhost:8006/api2/json/nodes/localhost/openvz/200').with(
        headers: @common_headers_in).to_return(
          status: 200,
          headers: @common_headers_out,
          body: '{"data":"UPID:localhost:0005C1EB:11BAA4EB:521D12B8:vzdestroy:200:root@pam:"}'
        )

      stub_request(:delete, 'http://localhost:8006/api2/json/nodes/localhost/openvz/201').with(
        headers: @common_headers_in).to_return(
          status: 500,
          headers: @common_headers_out,
          body: 'NOK: error code = 500'
        )

      # Delete the vm
      expect(@server1.openvz_delete(200)).to be_eql 'UPID:localhost:0005C1EB:11BAA4EB:521D12B8:vzdestroy:200:root@pam:'
      expect(@server1.openvz_delete(201)).to be_eql 'NOK: error code = 500'
    end
  end

  describe 'openvz_status' do
    it 'should get container status' do
      # VM Status
      stub_request(:get, 'http://localhost:8006/api2/json/nodes/localhost/openvz/200/status/current').with(
        headers: @common_headers_in).to_return(
          status: 200,
          headers: @common_headers_out,
          body: '{"data":{"maxswap":268435456,"disk":0,"ip":"-","status":"stopped","ha":0,"netout":0,"maxdisk":9.44473296573929e+21,"maxmem":268435456,"uptime":0,"swap":0,"nproc":0,"diskread":0,"cpu":0,"netin":0,"name":"CT200","failcnt":0,"diskwrite":0,"mem":0,"type":"openvz","cpus":1}}'
        )

      expect(@server1.openvz_status(200)).to be_an_instance_of Hash
      expect(@server1.openvz_status(200)['status']).to be_eql 'stopped'
      expect(@server1.openvz_status(200)['cpus']).to be_eql 1
    end
  end

  describe 'openvz_start' do
    it 'should start vm' do
      stub_request(:post, 'http://localhost:8006/api2/json/nodes/localhost/openvz/200/status/start').with(
        headers: @common_headers_in).to_return(
          status: 200,
          headers: @common_headers_out,
          body: '{"data":"UPID:ks311324:0005D91C:11BE5277:521D1C23:vzstart:200:root@pam:"}'
        )

      expect(@server1.openvz_start(200)).to be_eql 'UPID:ks311324:0005D91C:11BE5277:521D1C23:vzstart:200:root@pam:'
    end
  end
  
  describe 'openvz_stop' do
    it 'should stop vm' do
      stub_request(:post, 'http://localhost:8006/api2/json/nodes/localhost/openvz/200/status/stop').with(
        headers: @common_headers_in).to_return(
          status: 200,
          headers: @common_headers_out,
          body: '{"data":"UPID:ks311324:0005D91C:11BE5277:521D1C23:vzstop:200:root@pam:"}'
        )

      expect(@server1.openvz_stop(200)).to be_eql 'UPID:ks311324:0005D91C:11BE5277:521D1C23:vzstop:200:root@pam:'
    end
  end
  
  describe 'openvz_shutdown' do
    it 'should shutdown vm' do
      stub_request(:post, 'http://localhost:8006/api2/json/nodes/localhost/openvz/200/status/shutdown').with(
        headers: @common_headers_in).to_return(
          status: 200,
          headers: @common_headers_out,
          body: '{"data":"UPID:ks311324:0005D91C:11BE5277:521D1C23:vzshutdown:200:root@pam:"}'
        )

      expect(@server1.openvz_shutdown(200)).to be_eql 'UPID:ks311324:0005D91C:11BE5277:521D1C23:vzshutdown:200:root@pam:'
    end
  end

  describe 'openvz_config' do
    it 'should get container config' do
      # VM config
      stub_request(:get, 'http://localhost:8006/api2/json/nodes/localhost/openvz/200/config').with(
        headers: @common_headers_in).to_return(
          status: 200,
          headers: @common_headers_out,
          body: '{"data":{"quotaugidlimit":0,"disk":0,"ostemplate":"ubuntu-10.04-standard_10.04-4_i386.tar.gz","nameserver":"127.0.0.1 192.168.1.1","memory":256,"searchdomain":"domain.com","onboot":0,"cpuunits":1000,"swap":256,"quotatime":0,"digest":"5a6f4052d559d3ecc89c849214f482217018a07e","cpus":1,"storage":"local"}}'
        )

      expect(@server1.openvz_config(200)).to be_an_instance_of Hash
      expect(@server1.openvz_config(200)['searchdomain']).to be_eql 'domain.com'
      expect(@server1.openvz_config(200)['ostemplate']).to be_eql 'ubuntu-10.04-standard_10.04-4_i386.tar.gz'
    end
  end

  describe 'openvz_config_set' do
    it 'should modify container config' do
      # VM config
      stub_request(:put, 'http://localhost:8006/api2/json/nodes/localhost/openvz/200/config').with(
        headers: @common_headers_in).to_return(
          status: 200,
          headers: @common_headers_out,
          body: '{"data":null}'
        )

      @server1.openvz_config_set(200, 'searchdomain' => 'other.com')
    end
  end
end
