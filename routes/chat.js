import express from 'express';
let app = express();
const http = require('http').Server(app);
const io = require("socket.io")(http);
let router = express.Router();

router.get('/chat',(req,res)=>{
    res.render('chat');
});


export default router;