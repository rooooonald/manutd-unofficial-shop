import { MongoClient } from "mongodb";

const connectToDB = async () => {
  const client = new MongoClient(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.krwlyqt.mongodb.net/?retryWrites=true&w=majority`
  );
  const connection = await client.connect();

  return connection;
};

export default connectToDB;
