module Web::Controllers::Home
  class Index
    include Web::Action

    def call(params)
      puts "LiteCable SUCCESS"
      LiteCable.broadcast "chat", { title: "Hello from broadcast!", message: "Hello world!" }
    end
  end
end
