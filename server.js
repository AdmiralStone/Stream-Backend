const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(bodyParser.json());

app.get('/',(req,res) =>{
    res.send("Hello World");
});

app.use('/api/users',require('./routes/users'));
app.use('/api/profile',require('./routes/profile'));
app.use('/api/follow', require('./routes/follow'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/stream', require('./routes/stream'));


io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('joinChannel', (channelId) => {
      socket.join(channelId);
      console.log(`User joined channel ${channelId}`);
    });
  
    socket.on('message', (channelId, message) => {
      io.to(channelId).emit('message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on Port: ${PORT}`);
});

