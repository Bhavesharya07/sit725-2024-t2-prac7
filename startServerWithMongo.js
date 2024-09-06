import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './db.js';
import router from './router/router.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer); 

// Socket.io connection
io.on('connection', (socket) => {
    console.log('a client is connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    setInterval(() => {
        const x = parseInt(Math.random() * 10);
        socket.emit('number', x);
        console.log('Emitting Number ' + x);
    }, 1000);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

connectDB();

// Setup routes
router(app);

app.get('/', (req, res) => {
    res.sendFile(new URL('./index.html', import.meta.url).pathname);
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
