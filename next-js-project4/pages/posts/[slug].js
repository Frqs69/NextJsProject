import Head from "next/head";
import PostContent from "@/components/posts/post-detail/post-content";
import { getPostsFiles, getPostData } from "@/lib/posts-util";

export default function SinglePostPage({ post }) {
	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name='description' content={post.excerpt} />
			</Head>
			<PostContent post={post} />
		</>
	);
}

export const getStaticProps = async (context) => {
	const { params } = context;
	const { slug } = params;

	const postData = getPostData(slug);

	return {
		props: {
			post: postData,
		},
		revalidate: 600,
	};
};

export const getStaticPaths = async () => {
	const postFileNames = getPostsFiles();

	const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));

	return {
		paths: slugs.map((slug) => ({ params: { slug: slug } })),
		fallback: false,
	};
};
