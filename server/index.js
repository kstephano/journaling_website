const server = require('./app');
const { readFromFile } = require('./helpers/readWrite');
const port = process.env.PORT || 3000;

readFromFile();

// start the server
server.listen(port, () => {
   console.log(`Listening at http://localhost:${port}`);
 });