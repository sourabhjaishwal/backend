/*
- Starting the server
- Connecting with database
*/

const app = require("./src/app");
const mongoose = require("mongoose");

function connectToDb() {
  mongoose.connect(
    "mongodb+srv://jaishwalsourabh2000_db_user:NfIP4EPEuU1MpWN3@cluster0.f4bho5t.mongodb.net/day-04",
  ).then(()=>{
    console.log("Connected to Database.");
  })
}

connectToDb()

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
