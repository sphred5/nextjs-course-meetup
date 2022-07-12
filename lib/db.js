import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  return await MongoClient.connect(process.env.DB_URL);
}

export async function insertDocument(client, database, collection, data) {
  const db = client.db(database);
  const meetupsCollection = db.collection(collection);
  const result = await meetupsCollection.insertOne(data);
  client.close();
  return result;
}
