//this will be the observer and will recieve the incoming connections from the users
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    //normally event occuring here and event occuring in the client side will be the same name
    io.sockets.on('connection', function(socket){
        console.log('new connection recieved', socket.id);

        //detects that the socket is connected anymore
        socket.on('disconnect', function(){
            console.log('socket disconnected');
        });

        socket.on('join_room', function(data){
            console.log('joining request recieved', data);

            //if such a chat room does not exist, a chat room is created
            socket.join(data.chatroom);

            //an event has to emitted from here to tell the whole room that someone new has joined
            io.in(data.chatroom).emit('user_joined', data)
        });

        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('recieve_message', data);
        })
    })
}