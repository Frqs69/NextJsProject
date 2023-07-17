import fs from "fs";
import path from "path";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	if (req.method === "POST") {
		console.log("reqBody: " + req.body);
		const email = req.body.email;
		const feedbackText = req.body.feedback;

		const newFeedback = {
			id: new Date().toISOString(),
			email: email,
			text: feedbackText,
		};

		console.log("newFeedback: " + newFeedback);

		const filePath = path.join(process.cwd(), "data", "feedback.json");
		const fileData = fs.readFileSync(filePath);
		const data = JSON.parse(fileData);
		data.push(newFeedback);
		fs.writeFileSync(filePath, JSON.stringify(data));
		res
			.status(201)
			.json({ message: "Added data to file!", feedback: newFeedback });
	} else {
		res.status(200).json({ message: "This works!" });
	}
}
