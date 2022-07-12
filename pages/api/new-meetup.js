import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method == !"POST") {
    return;
  }
  const data = req.body;

  let client;

  try {
    client = await MongoClient.connect(process.env.DB_URL);
    res.status(201).json({ message: "connected to mongodb" });
  } catch (error) {
    res.status(500).json({ message: "error connecting to database" });
    return;
  }
  try {
    const db = client.db("meetups");
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
  } catch (error) {
    client.close();
    res.status(500).json({ message: "error inserting data" });
    console.log(error);
    return;
  }
  client.close();
  res.status(201).json({ message: "meetup added to database" });
}
export default handler;
