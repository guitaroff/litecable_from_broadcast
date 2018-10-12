require 'litecable'

# Sample chat application
module Chat
  class Connection < LiteCable::Connection::Base # :nodoc:
    identified_by :user, :sid

    def connect
      @user = 'guest'
      @sid = request.params['sid']
      $stdout.puts "#{@user} connected"
    end

    def disconnect
      $stdout.puts "#{@user} disconnected"
    end
  end

  class Channel < LiteCable::Channel::Base # :nodoc:
    identifier :chat

    def subscribed
      stream_from "chat"
    end

    def speak(data)
      LiteCable.broadcast "chat", message: data['message']
    end

    private

    def chat_id
      params.fetch('id')
    end
  end
end
