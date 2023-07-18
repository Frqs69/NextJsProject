import { MongoClient } from "mongodb";
export const connectDatabase = async () => {
	const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uiwc7jp.mongodb.net/events?retryWrites=true&w=majority`;
	const client = await MongoClient.connect(url);

	return client;
};

export const insertDocument = async (client, collection, document) => {
	const db = client.db();

	const result = await db.collection(collection).insertOne(document);
	return result;
};

export const getAllDocuments = async (
	client,
	collection,
	sort,
	filter = {}
) => {
	const db = client.db();
	const documents = await db
		.collection(collection)
		.find(filter)
		.sort(sort)
		.toArray();

	return documents;
};
