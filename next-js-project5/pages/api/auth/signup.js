import { connectToDatabase } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;
		const { email, password } = data;

		if (!email || !email.includes("@") || !password || password.trim() < 7) {
			res.status(422).json({ message: "Invalid input" });
			return;
		}

		const client = await connectToDatabase();

		const db = client.db();

		const existingUser = await db.collection("users").findOne({ email });

		if (existingUser) {
			res.status(422).json({ message: "User with this email already exist" });
			client.close();
			return;
		}

		const hashedPassword = await hashPassword(password);

		const result = await db
			.collection("users")
			.insertOne({ email: email, password: hashedPassword });

		client.close();
		res.status(201).json({ message: "Account created successfully" });
	}
}
