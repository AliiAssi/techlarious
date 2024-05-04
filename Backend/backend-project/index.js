/*building the server first step */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
/* connecting to the data base  */
const DB = require('./database').connectToDB;
DB();

/**  server only will parse the json requests only
    REST setup server                           **/
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// routers
app.use('/api/auth/', require('./routes/authRouter'));
app.use('/api/post/', require('./routes/postRouter'));
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('listening on port ', port);
});
