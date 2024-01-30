import { connectMongo } from "./mongoConnect.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const { PORT } = process.env;

const startServer = async () => {
  try {
    await connectMongo();

    app.listen(PORT || 4000, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
