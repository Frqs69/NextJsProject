import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { hashPassword, verifyPassword } from "@/lib/auth";

export default async function handler(req, res) {
	if (req.method != "PATCH") {
		return;
	}

	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		res.status(401).json({ message: "Not authenticated" });
		return;
	}

	const userEmail = session.user.email;
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;

	const client = await connectToDatabase();
	const db = client.db();

	const user = await db.collection("users").findOne({ email: userEmail });

	if (!user) {
		res.status(404).json({ message: "User not found" });
		client.close();
		return;
	}

	const isValid = await verifyPassword(oldPassword, user.password);

	if (!isValid) {
		res.status(403).json({ message: "Invalid password" });
		client.close();
		return;
	}

	const hashedPassword = await hashPassword(newPassword);

	const result = await db
		.collection("users")
		.updateOne({ email: user.email }, { $set: { password: hashedPassword } });

	client.close();
	res.status(200).json({ message: "Password changed successfully" });
}
