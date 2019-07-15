const express = require('express')
const app = express()

const port = process.env.PORT || 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')

console.log('testing lla')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true
}));

app.use(session({
    secret: 'puki muki',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    },
    maxAge: 60000 * 6000000
}))

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });


const dogRoute = require('./api/dog.route');
app.use('/api/dog', dogRoute)
const googleRoute = require('./api/google.route');
app.use('/api/google', googleRoute)




// const msgsDB = {};

// io.on('connection', function (socket) {
//   console.log('a user connected');

//   socket.on('disconnect', () => {
//       console.log('user disconnected');
//   });

//   socket.on('chat join', (toyId)=>{
//       const msg = {from: 'System', txt: `blala Joined`}

//       socket.join(toyId);
//       msgsDB[toyId] = msgsDB[toyId]? msgsDB[toyId] : [msg]
//       socket.emit('chat history', msgsDB[toyId]);
//   });

//   socket.on('chat msg', ({ txt }, toyId) => {
//       console.log('message: ' + txt);
//       msgsDB[toyId].push(txt);
//       io.to(toyId).emit('chat newMsg', txt);
//   });

// });


app.get('/', (req, res) => res.send('Hello World!'))

http.listen(port, () => console.log(`Example app listening on port ${port}!`))