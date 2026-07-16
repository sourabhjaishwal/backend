/*
Main point of server.js file:
1. To import the server config and start the server.
*/

const app = require("./src/app.js");

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
