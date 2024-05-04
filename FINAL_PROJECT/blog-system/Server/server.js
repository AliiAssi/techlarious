const express = require('express');
const ConnectionToDB = require('./config/connectToDb');
const bodyParser = require('body-parser');
const { errorHandler, cannotGet } = require('./Middleware/error');
const cors = require('cors');
// dont miss the connection to the dotenv library
require('dotenv').config();



//Connection To MongoDB
ConnectionToDB();




// Init the Application
const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin:"http://localhost:5173"
})); //cors policy

// routers 
app.use('/api/auth/',require('./route/authRoute'));
app.use('/api/user/',require('./route/userRoute'));
app.use('/api/post/',require('./route/postRouter'));
app.use('/api/comment/',require('./route/commentRouter'));
app.use('/api/category/',require('./route/categoryRoute'));

//Middlewares
app.use(express.json());

// error handler middleware
app.use(cannotGet);
app.use(errorHandler);

// Run the application server
const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Starting server on port ${port} in ${process.env.NODE_ENV} mode `);
})