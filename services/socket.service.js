
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

        socket.on('user login', (userId) => {
            console.log('The user login is ', userId)
            socket.join(userId);
        })

        socket.on('friend req', (user, currUserLogin) => {
            // console.log('This is freind req happed in back',currUserLogin.owner.fullName)
            console.log('this is emit')

            console.log('this is the user', user._id)
            io.to(user._id).emit('friend req sent', currUserLogin.owner.fullName);
        })
        socket.on('friend like', (user, currUserLogin) => {
            // console.log('This is freind req happed in back',currUserLogin.owner.fullName)
            console.log('this is the user', user._id)
            io.to(user._id).emit('friend like sent', currUserLogin.owner.fullName);
        })

    });

    // io.on('friend req', function (socket) {

    // })


}


module.exports = {
    setup
}