import {
	connectDatabase,
	insertDocument,
	getAllDocuments,
} from "@/helpers/db-util";

export default async function handler(req, res) {
	const eventId = req.query.eventId;

	let client;

	try {
		client = await connectDatabase();
	} catch (err) {
		res.status(500).json({ message: "Connection to the database failed!" });
		return;
	}

	if (req.method === "POST") {
		const { email, name, text } = req.body;

		if (
			!email ||
			!email.includes("@") ||
			!name ||
			!text ||
			text.trim() === "" ||
			name.trim() === ""
		) {
			res.status(422).json({ message: "Invalid  input." });
			client.close();
			return;
		}

		const newComment = {
			email,
			name,
			text,
			eventId,
		};

		let result;

		try {
			result = await insertDocument(client, "comments", newComment);
			newComment._id = result.insertedId;

			res.status(201).json({ message: "Comment Added", comment: newComment });
		} catch (err) {
			res.status(500).json({ message: "Insert to the database failed!" });
		}

		client.close();
	}

	if (req.method === "GET") {
		let documents;
		try {
			documents = await getAllDocuments(
				client,
				"comments",
				{ _id: -1 },
				{ eventId: eventId }
			);
			res.status(200).json({ comments: documents });
		} catch (err) {
			res.status(500).json({ message: "Get all data failed!" });
		}
	}

	client.close();
}
