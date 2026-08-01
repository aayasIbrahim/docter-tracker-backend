import app from "./app";
import "dotenv/config";
import config from "./config";
import connectDB from "./lib/connectDB";

const port = config.port || 5000;

const main = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error(`Error starting the server : ${error}`);

    process.exit(1);
  }
};

main();
