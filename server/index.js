const server = require('./app');
const port = process.env.PORT || 3000;

// start the server
server.listen(port, () => {
   console.log(`Listening at http://localhost:${port}`);
 });