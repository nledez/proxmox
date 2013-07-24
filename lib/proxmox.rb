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
      @auth_params ||= begin
        ticket = nil
        csrf_prevention_token = nil
        @site['access/ticket'].post :username=>@username,
          :realm=>@realm,
          :password=>@password do |response, request, result, &block|
            if response.code == 200
              data = JSON.parse(response.body)
              ticket = data['data']['ticket']
              csrf_prevention_token = data['data']['CSRFPreventionToken']
              if !ticket.nil?
                token = 'PVEAuthCookie=' + ticket.gsub!(/:/,'%3A').gsub!(/=/,'%3D')
              end
              @status = "connected"
              {:CSRFPreventionToken => csrf_prevention_token, :cookie => token}
            elsif response.code == 200
              @status = "error"
            end
          #
        end
      end
    end
  end
end
