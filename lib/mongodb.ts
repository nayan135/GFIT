import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
	throw new Error("Please add your Mongo URI to .env")
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
	if (!(global as any).mongoClientPromise) {
		client = new MongoClient(uri, options)
		;(global as any).mongoClientPromise = client.connect()
	}
	clientPromise = (global as any).mongoClientPromise
} else {
	client = new MongoClient(uri, options)
	clientPromise = client.connect()
}

export default clientPromise
