import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-util";

export const getStaticProps = async () => {
	const allPosts = await getAllPosts();

	return {
		props: {
			posts: allPosts,
		},
	};
};

export default function AllPostsPage({ posts }) {
	return <AllPosts posts={posts} />;
}
