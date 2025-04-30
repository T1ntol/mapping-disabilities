// pages/api/children.ts
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

interface Child {
  _id: string;
  name: string;
  age: number;
  disability: string;
  lat: number;
  lng: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<Child>("children");

    if (req.method === "GET") {
      if (req.query.id) {
        // Get a single child by _id
        const child = await collection.findOne({
          _id: new ObjectId(req.query.id as string),
        });
        res.status(200).json(child);
      } else {
        // Get all children data
        const children = await collection.find({}).toArray();
        res.status(200).json(children);
      }
    } else if (req.method === "POST") {
      // Insert new child data
      const { name, age, disability, lat, lng } = req.body;
      const newChild = { name, age, disability, lat, lng };
      const result = await collection.insertOne(newChild);
      res.status(201).json(result.ops[0]);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
