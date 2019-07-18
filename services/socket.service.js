
const socketIO = require('socket.io');
// const io = require('socket.io')(http);
// const roomService = require('./room-service');

var io;
var activeUsersCount = 0;

function setup(http) {
    io = socketIO(http);
    io.on('connection', function (socket) {
        console.log('a user connected');
        var room;
        activeUsersCount++;

        socket.on('disconnect', () => {
            console.log('user disconnected');
            activeUsersCount--;
        });

        socket.on('chat join', (user) => {
            // room = roomService.placeInRoom(user)
            console.log('Placed', user, 'in room:', room);
            socket.join(room.id);
        });

        socket.on('chat msg', (msg) => {
            console.log('message: ' + msg);
            io.to(room.id).emit('chat newMsg', msg);
        });

        socket.on('friend req', (user) => {
            console.log('This is freind req happed in back')
            console.log('this is emit')
            // console.log('this is the user',user)
            socket.broadcast.emit('friend req sent', user);
        })

    });

    // io.on('friend req', function (socket) {

    // })


}


module.exports = {
    setup
}