import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
	const url = `mongodb+srv://${process.env.mongoDb_user}:${process.env.mongoDb_password}@${process.env.mongoDb_clusterName}.uiwc7jp.mongodb.net/${process.env.mongoDb_database}?retryWrites=true&w=majority`;
	const client = await MongoClient.connect(url);

	return client;
};

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { email, name, message } = req.body;

		if (
			!email ||
			!email.includes("@") ||
			!name ||
			!name.trim() === "" ||
			!message ||
			!message.trim() === ""
		) {
			res.status(422).json({ message: "Invalid input" });
			return;
		}

		const newMessage = {
			email,
			name,
			message,
		};

		let client;
		try {
			client = await connectDatabase();
		} catch (err) {
			res.status(500).json({ message: "connection to database fail" });
			return;
		}

		const db = client.db();

		let result;
		try {
			result = await db.collection("messages").insertOne(newMessage);
			newMessage.id = result.insertedId;
		} catch (err) {
			client.close();
			res.status(500).json({ message: "Adding data to database fail" });
			return;
		}

		client.close();
		res
			.status(201)
			.json({ message: "Successfully stored message!", message: newMessage });
	}
}
