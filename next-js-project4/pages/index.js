import Hero from "@/components/home-Page/hero";
import FeaturedPosts from "@/components/home-Page/featured-posts";

const dummy_posts = [
	{
		title: "Getting started with Nextjs",
		image: "getting-started-nextjs.png",
		excerpt:
			"NextJS is a the React framework for production - it makes fullstack React apps and sites a breeze and ships with built-in SSR.",
		date: "2022-03-10",
		slug: "getting-started-nextjs",
	},
	{
		title: "Getting started with Nextjs",
		image: "getting-started-nextjs.png",
		excerpt:
			"NextJS is a the React framework for production - it makes fullstack React apps and sites a breeze and ships with built-in SSR.",
		date: "2022-03-10",
		slug: "getting-started-nextjs",
	},
	{
		title: "Getting started with Nextjs",
		image: "getting-started-nextjs.png",
		excerpt:
			"NextJS is a the React framework for production - it makes fullstack React apps and sites a breeze and ships with built-in SSR.",
		date: "2022-03-10",
		slug: "getting-started-nextjs",
	},
];

export default function Home() {
	return (
		<>
			<Hero />
			<FeaturedPosts posts={dummy_posts} />
		</>
	);
}
