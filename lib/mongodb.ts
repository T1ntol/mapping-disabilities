// lib/mongodb.ts
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI || "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global client instance to avoid exhausting resources
  let globalWithMongoClientPromise = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };

  if (!globalWithMongoClientPromise._mongoClientPromise) {
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
