var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)

app.get('/', (req, res) =>{
    res.sendfile('index.html');
}); 

// //show connect in the console
// io.on('connection', (socket) => {
//     console.log('Connected');
//     socket.on('disconnect', () =>{
//         console.log('disconnect');
//     })
// })

// // count user connnect
// var clients = 0;
// io.on('connection', (socket) => {
//     clients++;
//     io.sockets.emit('broadcast', {message: clients + "client connected!"})
//     socket.on('disconnect', () => {
//         clients--;
//         io.sockets.emit('broadcast', {message: clients + "client connected!"})
//     })
// })

users = [];
io.on('connection', (socket) => {
    console.log('connected');
    socket.on('setUsername', (data) => {
        if(users.indexOf(data) == -1){
            users.push(data);
            socket.emit('userSet', {username: data});
        }else{
            socket.emit('userExists', data + ' มีชื่อผู้ใช้นี้แล้ว กรุณใช้ชื่อใหม่')
        }
    })

    socket.on('msg' , (data) => {
        io.sockets.emit('newMessage', data)
    })
})

http.listen(3000, () => {
    console.log('start server on port : 3000')
})