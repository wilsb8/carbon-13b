const http = require('http');
require('dotenv').config();
const app = require('./app/app');

http.createServer(app).listen(process.env.port, ()=>{
    console.log(`Server here, I am fully operational and all my circuits are listening on port: ${process.env.port}.`);
});