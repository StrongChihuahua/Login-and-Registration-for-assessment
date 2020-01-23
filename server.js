const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const socket = require('socket.io');

const port = process.env.PORT || 7000;

//Body Parser
app.use(express.json());
app.use(cors());

//connect to database
mongoose.connect(config.get('mongoURI'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => {
        console.log(`Connected to mongodb database`);
    })
    .catch(err => {
        console.log(err);
    })




const server = app.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);
});

const io = socket(server);
//console.log(typeof io);

//Socket IO middleware
app.use((req, res, next) => {
    req.io = io;
    next();
})

//Routes for the API
app.use('/api/users', require('./api/routes/core.js'));

//console.log(typeof io);


// app.use((req, res, next) => {
//     //const io = socket(server);
//     res.socketIO = io;
//     console.log(io);
//     next();
// })

//app.set("io", io);

// module.exports = sockIO = (req, res, next) => {
//     console.log('middleware works!')
//     next();
// }


    io.on('connection', (socket) => {
        console.log('socket connection has been established', socket.id);
    
        setTimeout(() => {
            socket.emit('test', { msg: 'TEST123'});
        }, 3000);
        
    
        socket.on('toServer', data => {
            console.log(data);
        })
    });




//setTimeout(socketTOtest, 5000);
