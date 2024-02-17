/*building the server first step */
const express = require('express');
const app = express();
/* connecting to the data base  */
const DB = require('./database').connectToDB;
DB();

/**  server only will parse the json requests only
    REST setup server                           **/
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('listening on port ', port);
});
