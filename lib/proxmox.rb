require "proxmox/version"
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

    def openvz_status(vmid)
      http_action_get "nodes/#{@node}/openvz/#{vmid}/status/current"
    end

    def openvz_start(vmid)
      http_action_post "nodes/#{@node}/openvz/#{vmid}/status/start"
    end

    def openvz_stop(vmid)
      http_action_post "nodes/#{@node}/openvz/#{vmid}/status/stop"
    end

    def openvz_shutdown(vmid)
      http_action_post "nodes/#{@node}/openvz/#{vmid}/status/shutdown"
    end

    def openvz_config(vmid)
      http_action_get "nodes/#{@node}/openvz/#{vmid}/config"
    end

    private
    def create_ticket
        post_param = { :username=>@username, :realm=>@realm, :password=>@password }
        @site['access/ticket'].post post_param do |response, request, result, &block|
          if response.code == 200
            extract_ticket response
          else
            @status = "error"
          end
        end
    end

    def extract_ticket(response)
      data = JSON.parse(response.body)
      ticket = data['data']['ticket']
      csrf_prevention_token = data['data']['CSRFPreventionToken']
      unless ticket.nil?
        token = 'PVEAuthCookie=' + ticket.gsub!(/:/,'%3A').gsub!(/=/,'%3D')
      end
      @status = "connected"
      {
        :CSRFPreventionToken => csrf_prevention_token,
        :cookie => token
      }
    end

    def check_response(response)
      if (response.code == 200) then
        JSON.parse(response.body)['data']
      else
        "NOK: error code = " + response.code.to_s
      end
    end

    def http_action_post(url, data = "")
      @site[url].post data, @auth_params do |response, request, result, &block|
        check_response response
      end
    end

    def http_action_get(url)
      @site[url].get @auth_params do |response, request, result, &block|
        check_response response
      end
    end

    def http_action_delete(url)
      @site[url].delete @auth_params do |response, request, result, &block|
        check_response response
      end
    end
  end
end
