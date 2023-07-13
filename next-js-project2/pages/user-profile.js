export async function getServerSideProps({ req, res }) {
	return {
		props: {
			username: "Max",
		},
	};
}

export default function UserProfilePage({ username }) {
	return <h1>{username}</h1>;
}
