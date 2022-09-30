import mongoose from "mongoose";
/**
 * Set DB_URL in .env file
 */
const connectDatabase = () => {
  mongoose.set("debug", true);
  mongoose.connect(`${process.env.DB_URL}`);

  (async () => {
    mongoose.connection.once("open", () => {
      console.log("Connected To MongoDB");
    });
  })();
};

export default connectDatabase;
