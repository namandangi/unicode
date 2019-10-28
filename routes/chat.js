import express from 'express';
let app = express();
const http = require('http').Server(app);
const io = require("socket.io")(http);
let router = express.Router();

router.get('/chat',(req,res)=>{
    res.render('chat');
});

// io.on("connection", function(socket) {

//     socket.on("user_join", function(data) {
//         this.username = data;
//         socket.broadcast.emit("user_join", data);
//     });

//     socket.on("chat_message", function(data) {
//         data.username = this.username;
//         socket.broadcast.emit("chat_message", data);
//     });

//     socket.on("disconnect", function(data) {
//         socket.broadcast.emit("user_leave", this.username);
//     });
// });

export default router;