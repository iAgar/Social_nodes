class ChatEngine{constructor(e,s){this.chatBox=$("#"+e),this.userEmail=s,this.socket=io.connect("http://localhost:5000"),this.userEmail&&this.connnectionHandler()}connnectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("connection established using sockets"),e.socket.emit("join_room",{user_email:e.userEmail,chatroom:"Social Nodes"}),e.socket.on("user_join",(function(e){console.log("User Joined",e)}))})),$("#send-message").click((function(){let s=$("#chat-message-input").val();""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatroom:"Social Nodes"})})),e.socket.on("recieve_message",(function(s){console.log("message recieved",s.message);let o=$("<li>"),n="other-message";s.userEmail==e.userEmail&&(n="self-message"),o.append($("<span>",{html:s.message})),o.append($("<sub>",{html:s.userEmail})),o.addClass(n),$("chat-messages-list").append(o)}))}}