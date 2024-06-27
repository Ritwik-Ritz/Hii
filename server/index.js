import express from 'express';
import { createServer } from 'http';
import {Server} from 'socket.io';
import cors from 'cors';

const app = express();
const port = 4000;
const httpServer = createServer(app);

app.use(express.json());
app.use(cors());

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

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
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