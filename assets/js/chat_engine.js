//this is the file that is going to be communicating from the browser side
class ChatEngine{
    //this will take the id of the chat box and the email id of the user sending message
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        //io is a global variable that has been made available as soon as the cdn js file was included
        this.socket = io.connect('http://localhost:5000');

        //the connectionHandler must be called 
        //it will only be called if there is userEmail
        if(this.userEmail){
            this.connnectionHandler();
        }
    }

    //this will have the to and fro interaction between user and server
    connnectionHandler(){

        let self = this;

        //on is used for detecting an event
        //connection is the first event that taked place on socket
        this.socket.on('connect', function(){
            console.log('connection established using sockets');

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'Social-Nodes'
            });

            self.socket.on('user_join', function(data){
                console.log('User Joined', data);
            })
        });

        $('#send-message').click(function(e){
            e.preventDefault();
            let msg = $('#chat-message-input').val();

            if(msg!= ''){
                self.socket.emit('send_message', {
                    message: msg,
                    userEmail: self.userEmail,
                    chatroom: 'Social-Nodes'
                })
            }
        });

        self.socket.on('recieve_message', function(data){
            console.log('message recieved', data.message);

            console.log(self.userEmail);
            console.log(data.userEmail)

            let newMessage = $('<li>');

            let gap = $('<br>');

            let messageType = 'other-message';

            if(data.userEmail == self.userEmail){
                messageType='self-message';
            }

            newMessage.append($('<span>',{
                'html': data.message
            }));

            newMessage.append('<sub>', {
                 'html': data.userEmail
            });

            newMessage.addClass(messageType);

            console.log(newMessage);

            $('#chat-messages-list').append(gap);
            $('#chat-messages-list').append(newMessage);
        })
    }
}