import UserProfile from "../components/profile/user-profile";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

function ProfilePage() {
	return <UserProfile />;
}

export async function getServerSideProps(context) {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: `/auth`,
				permanent: false,
			},
		};
	}

	session.user.name = null;
	session.user.image = null;
	return {
		props: {
			session,
		},
	};
}

export default ProfilePage;
