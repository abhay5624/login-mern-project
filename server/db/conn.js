const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection Successful");
  })
  .catch((err) => {
    console.log("connection unSuccessful", err);
  });
