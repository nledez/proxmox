require "proxmox/version"
require "proxmox/auth"
require "proxmox/http"
require 'rest_client'
require 'json'

module Proxmox
  class Proxmox
    attr_reader :status

    def initialize(pve_cluster, node, username, password, realm)
      @pve_cluster = pve_cluster
      @node = node
      @username = username
      @password = password
      @realm = realm
      @status = "error"
      @site = RestClient::Resource.new(@pve_cluster)
      @auth_params = create_ticket
    end

    def task_status(upid)
      data = http_action_get "nodes/#{@node}/tasks/#{URI::encode upid}/status"
      status = data['status']
      exitstatus = data['exitstatus']
      if exitstatus
        "#{status}:#{exitstatus}"
      else
        "#{status}"
      end
    end

    def templates
      data = http_action_get "nodes/#{@node}/storage/local/content"
      template_list = Hash.new
      data.each do |ve|
        name = ve['volid'].gsub(/^local:vztmpl\/(.*).tar.gz$/, '\1')
        template_list[name] = ve
      end
      template_list
    end

    def openvz_get
      data = http_action_get "nodes/#{@node}/openvz"
      ve_list = Hash.new
      data.each do |ve|
        ve_list[ve['vmid']] = ve
      end
      ve_list
    end

    def openvz_post(ostemplate, vmid, config = {})
      config['vmid'] = vmid
      config['ostemplate'] = "local%3Avztmpl%2F#{ostemplate}.tar.gz"
      vm_definition = config.to_a.map { |v| v.join '=' }.join '&'

      http_action_post("nodes/#{@node}/openvz", vm_definition)
    end

    def openvz_delete(vmid)
      http_action_delete "nodes/#{@node}/openvz/#{vmid}"
    end

    def openvz_vm_status(vmid)
      http_action_get "nodes/#{@node}/openvz/#{vmid}/status/current"
    end

    def openvz_vm_start(vmid)
      http_action_post "nodes/#{@node}/openvz/#{vmid}/status/start"
    end

    def openvz_vm_stop(vmid)
      http_action_post "nodes/#{@node}/openvz/#{vmid}/status/stop"
    end

    def openvz_vm_shutdown(vmid)
      http_action_post "nodes/#{@node}/openvz/#{vmid}/status/shutdown"
    end

    def openvz_vm_config(vmid)
      http_action_get "nodes/#{@node}/openvz/#{vmid}/config"
    end

    def check_response(response)
      if (response.code == 200) then
        JSON.parse(response.body)['data']
      else
        "NOK: error code = " + response.code.to_s
      end
    end
  end
end
