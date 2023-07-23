import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/auth";

export const authOptions = {
	secret: process.env.AUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				const client = await connectToDatabase();

				const usersCollection = client.db().collection("users");

				const user = await usersCollection.findOne({
					email: credentials.email,
				});

				if (!user) {
					client.close();
					throw new Error("No user found!");
				}

				const isPasswordValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isPasswordValid) {
					client.close();
					throw new Error("Could not log you in!");
				}

				client.close();

				return {
					email: user.email,
				};
			},
		}),
	],
};

export default NextAuth(authOptions);
