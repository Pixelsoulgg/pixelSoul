import { MongoClient } from "mongodb";
import 'dotenv/config';

const uri = process.env.MONGO_CONECTION_STRING || '';

export const mongoClient = new MongoClient(uri);

export async function mongoConnection(dbName: string = "tournament") {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await mongoClient.connect();
    // Establish and verify connection
    await mongoClient.db(dbName).command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
  }
  return mongoClient.db(dbName);
}