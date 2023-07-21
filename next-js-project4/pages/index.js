import Hero from "@/components/home-Page/hero";
import FeaturedPosts from "@/components/home-Page/featured-posts";
import { getFeaturedPosts } from "@/lib/posts-util";

export const getStaticProps = async () => {
	const featuredPosts = await getFeaturedPosts();

	return {
		props: {
			posts: featuredPosts,
		},
	};
};

export default function Home({ posts }) {
	return (
		<>
			<Hero />
			<FeaturedPosts posts={posts} />
		</>
	);
}
