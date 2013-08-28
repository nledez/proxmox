module Proxmox
  class Proxmox
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
  end
end
