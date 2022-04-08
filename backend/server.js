const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling Uncught error
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to Uncaught Error");
  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });

//Connecting to datbase
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost: ${process.env.PORT}`);
});

//Unhandeled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
