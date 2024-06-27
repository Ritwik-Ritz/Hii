import express from 'express';
import { createServer } from 'http';
import {Server} from 'socket.io';
import cors from 'cors';

const app = express();
const port = 4000;
const httpServer = createServer(app);

app.use(express.json());
app.use(cors());

let users = [];

const socketIO = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});

socketIO.on('connection', (socket)=>{
  console.log(`⚡: ${socket.id} user just connected!`)  

  socket.on("message", data => {
    socketIO.emit("messageResponse", data)
  });

  socket.on('newUser', (data)=>{
    //adds user to the list
    users.push(data);
    //sends the new list of users
    socketIO.emit('newUserResponse', users)
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');

    users = users.filter((user) => user.socketID !== socket.id);
    socket.disconnect()
  });
});



app.get('/api', (req, res) => {
    res.json({
      message: 'Hello world',
    });
  });

httpServer.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });