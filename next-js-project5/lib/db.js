import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
	const url = `mongodb+srv://${process.env.mongoDb_user}:${process.env.mongoDb_password}@${process.env.mongoDb_clusterName}.uiwc7jp.mongodb.net/${process.env.mongoDb_database}?retryWrites=true&w=majority`;
	const client = await MongoClient.connect(url);

	return client;
};
