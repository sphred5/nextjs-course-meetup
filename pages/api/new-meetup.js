import { connectToDatabase, insertDocument } from "../../lib/db.js";

async function handler(req, res) {
  if (req.method == !"POST") {
    return;
  }
  const data = req.body;
  let client;

  try {
    client = await connectToDatabase();
    res.status(201).json({ message: "connected to mongodb" });
  } catch (error) {
    res.status(500).json({ message: "error connecting to database" });
    return;
  }
  try {
    const result = await insertDocument(client, "meetups", "meetups", data);
    res.status(201).json({ message: "meetup added to database" });
  } catch (error) {
    client.close();
    res.status(500).json({ message: "error inserting document" });
    return;
  }
  client.close();
}
export default handler;
