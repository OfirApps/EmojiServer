var express = require("express")
const app = express();
var cors = require("cors")
const Database = require("@replit/database")
const db = new Database()
//db.set("users", 15).then(() => {});
app.use(cors())
var server=app.listen(3000);
const io = require("socket.io")(server, 
  { 
  cors: {    
    origin: "*",    
    methods: ["GET", "POST"]  
  }});

app.get('/', (req, res) => {
  res.send("<script>window.location.replace('https:///emojiland.repl.co/')</script>")
});
io.sockets.on('connection',(socket)=>{
db.get("users").then(value => {
  io.sockets.emit('users',value);
}); 
    console.log("socket")
    socket.on('send',(data)=>{
    socket.broadcast.emit('chat',data);
});
socket.on('disconnect',(data)=>{
  io.sockets.emit('users',socket.client.conn.server.clientsCount);
});

socket.on('bump',(data)=>{
  db.get("users").then(value => {
  
db.set("users", Math.round(value)+1).then(() => {
  console.log("Next user will be @User" + (Math.round(value)+1))
});
}); 
});

});


/*
app.listen(3000, () => {
  console.log('server started');
});
*/