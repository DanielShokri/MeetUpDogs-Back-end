
const socketIO = require('socket.io');
const roomService = require('./room-service');

var io;
var activeUsersCount = 0;
const msgsDB = {};

function setup(http) {
    io = socketIO(http);
    io.on('connection', function (socket) {

        console.log('a user connected');
        activeUsersCount++;
        var room;

        socket.on('disconnect', () => {
            console.log('user disconnected');
            activeUsersCount--;
        });

        socket.on('test users chat', members => {
            members.sort((a,b) => a.userName > b.userName? 1 : -1)
            socket.join(members[0]._id + members[1]._id)
            // console.log('JOINING',members[0]._id + members[1]._id)
        })

        socket.on('chat msg', ({members, msg}) =>  {
            members.sort((a,b) => a.userName > b.userName? 1 : -1)
            // if (msgsDB[userId]) msgsDB[userId].push(msg);
            // else msgsDB[userId] = [];
            io.to(members[0]._id + members[1]._id).emit('test got msg',msg)
            // console.log('SENDING',members[0]._id + members[1]._id)
        })

        socket.on('user typing', ({members, user}) =>{
            console.log(members,'this is soket memebers')
            members.sort((a,b) => a.userName > b.userName? 1 : -1)
            socket.join(members[0]._id + members[1]._id)
            socket.broadcast.to(members[0]._id + members[1]._id).emit('user isTyping', `${user} is typing...`)
        })

        socket.on('chat notification', (senderUser, getUser) =>{
            io.to(getUser._id).emit('chat notification sent', senderUser);
        });

        socket.on('user login', (userId) => {
            socket.join(userId);
        });

        socket.on('friend req', (user, currUserLogin) => {
            io.to(user._id).emit('friend req sent', currUserLogin.owner.fullName);
        });

        socket.on('friend like', (user, currUserLogin) => {
            io.to(user._id).emit('friend like sent', currUserLogin.owner.fullName);
        });

    });
}


module.exports = {
    setup
}