//alert('secret_channel');

var socketId = Date.now();
var messageList = document.getElementById("message_list");
//alert(messageList);

var escape = function(str) {
  return ('' + str).replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;')
                   .replace(/"/g, '&quot;');
}

var addMessage = function(data){
  var node = document.createElement('div');
  var me = data['user'] == data['sid'] == socketId
  node.className = "message" + (me ? ' me' : '') + (data['system'] ? ' system' : '');
  node.innerHTML =
    '<div class="txt">' + escape(data['message']) + '</div>';
  messageList.appendChild(node);
};

ActionCable.startDebugging();
var cable = ActionCable.createConsumer('ws://localhost:9293/cable?sid=' + socketId);
console.log(cable);

var secretChannel = cable.subscriptions.create(
  { channel: 'chat'},
  {
    connected: function(data){
      console.log("Secret channel 25 connected");
      addMessage({ user: 'BOT', message: "I'm connected", system: true });
      addMessage({ message: "Hello from broadcast25!"});
      return this.perform("speak", {
        message: 'Проверка связи 25'
      });
    },

    disconnected: function(){
      console.log("Secret channel disconnected");
      addMessage({ user: 'BOT', message: "Sorry, but you've been disconnected(", system: true });
    },

    received: function(data) {
      console.log("Received", data['message']);
      addMessage(data);
      // return new Notification(data['title'], {
      //   body: data['body']
      // });
    }
});
