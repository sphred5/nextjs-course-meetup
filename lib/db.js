import { MongoClient, ObjectId } from "mongodb";

export async function connectToDatabase() {
  return await MongoClient.connect(process.env.DB_URL);
}

export async function insertDocument(client, dbName, collection, data) {
  const db = client.db(dbName);
  const meetupsCollection = db.collection(collection);
  const result = await meetupsCollection.insertOne(data);
  client.close();
  return result;
}

export async function getAllDocuments(client, dbName, collection, sort) {
  const db = client.db(dbName);
  const events = await db.collection(collection).find().sort(sort).toArray();
  const formattedEvents = events.map((event) => {
    return {
      ...event,
      _id: event._id.toString(),
    };
  });
  client.close();
  return formattedEvents;
}

export async function getAllDocumentIds(client, dbName, collection) {
  const db = client.db(dbName);
  const documents = await db
    .collection(collection)
    .find({}, { _id: 1 })
    .toArray();
  const formattedDocuments = documents.map((document) => {
    return document._id.toString();
  });
  return formattedDocuments;
}

export async function getDocument(client, dbName, collection, id) {
  const db = client.db(dbName);
  const document = await db
    .collection(collection)
    .findOne({ _id: ObjectId(id) });
  const formattedDocument = { ...document, _id: document._id.toString() };
  client.close();
  return formattedDocument;
}
