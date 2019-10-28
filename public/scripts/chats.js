// alert('hello');
$(function(){
    //make connection
 var socket = io.connect('http://localhost:3000/chat')
 alert('hello');
 //buttons and inputs
 var message = $("#message")
 var username = $("#username")
 var send_message = $("#send_message")
 var send_username = $("#send_username")
 var chatroom = $("#chatroom")
 var feedback = $("#feedback")

 //Emit message
 send_message.click(function(){
     socket.emit('new_message', {message : message.val()})
     console.log(message.val());
 })


 //Listen on new_message
 socket.on("new_message", (data) => {
     feedback.html('');
     message.val('');
     chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
 })

 //Emit a username
 send_username.click(function(){
     socket.emit('change_username', {username : username.val()})
 })

 //Emit typing
 message.bind("keypress", () => {
     socket.emit('typing')
 })

 //Listen on typing
 socket.on('typing', (data) => {
     feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
 })
});

// $(function(){

// var socket = io.connect('http://localhost:3000/chat');

// // ask username
// var username = prompt('Please tell me your name');
// socket.emit('username', username);

// // submit text message without reload/refresh the page
// $('form').submit(function(e){
//     e.preventDefault(); // prevents page reloading
//     socket.emit('chat_message', $('#txt').val());
//     $('#txt').val('');
//     return false;
// });
// // append the chat text message
// socket.on('chat_message', function(msg){
//     $('#messages').append($('<li>').html(msg));
// });
// // append text if someone is online
// socket.on('is_online', function(username) {
//     $('#messages').append($('<li>').html(username));
// });

// });