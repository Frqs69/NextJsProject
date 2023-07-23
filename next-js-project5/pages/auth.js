import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import AuthForm from "../components/auth/auth-form";

function AuthPage() {
	return <AuthForm />;
}

export async function getServerSideProps(context) {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (!session) {
		return {
			props: {
				message: "no session",
			},
		};
	}

	session.user.name = null;
	session.user.image = null;
	return {
		redirect: {
			destination: `/`,
			permanent: false,
		},
		props: {
			session,
		},
	};
}

export default AuthPage;
