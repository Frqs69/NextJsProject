import classes from "./post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";

const dummy_post = {
	title: "Getting started with Nextjs",
	image: "getting-started-nextjs.png",
	date: "2022-03-10",
	slug: "getting-started-nextjs",
	content: "# This is a **firts** post",
};

export default function PostContent() {
	const imagePath = `/images/posts/${dummy_post.slug}/${dummy_post.image}`;

	return (
		<article className={classes.content}>
			<PostHeader title={dummy_post.title} image={imagePath} />
			<ReactMarkdown>{dummy_post.content}</ReactMarkdown>
		</article>
	);
}
