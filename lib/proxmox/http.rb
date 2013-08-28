module Proxmox
  class Proxmox
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
