const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const config = require('config');
const cors = require('cors');
const config = require('config');



const port = process.env.PORT || 7000;

//Body Parser
app.use(express.json());
app.use(cors());

mongoose.connect(config.get('mongoURI'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log(`Connected to mongodb database`);
    })
    .catch(err => {
        console.log(err);
    })


//Routes for the API
//app.use('/api/users', user_route);
app.use('/api/users', require('./api/routes/user.js'));


// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);
});
