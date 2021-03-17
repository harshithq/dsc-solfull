
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors =require("cors")


const categories = require("./routes/categories");
const listings = require("./route/listings");
const listing = require("./routes/listing");
const users = require("./routes/users");
const user = require("./routes/user");
const auth = require("./routes/auth");
const my = require("./routes/my");
const messages = require("./routes/messages");
const expoPushTokens = require("./routes/expoPushTokens");
const helmet = require("helmet");
const compression = require("compression");
const config = require("config");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(compression());

app.use("/api/categories", categories);
app.use("/api/listing", listing);
app.use("/api/listings", listings);
app.use("/api/user", user);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/my", my);
app.use("/api/expoPushTokens", expoPushTokens);
app.use("/api/messages", messages);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const client = require("mongodb").MongoClient;
const url =
  "mongodb+srv://Aryan:mohit2009@cluster0.mwbgn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(
  url,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB Connected");
  }
);
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

app.use(express.json());

// const listingsRouter = require("./route/listings");
// app.use("/listings", listingsRouter);

const usersRouter = require("./route/users");
app.use("/users", usersRouter);

const categorysRouter = require("./route/category");
app.use("/categorys", categorysRouter);

const port = process.env.PORT || config.get("port");
app.listen(port, function () {
  console.log(`Server started on port ${port}...`);
});