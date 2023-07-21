import classes from "./post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const dummy_post = {
	title: "Getting started with Nextjs",
	image: "getting-started-nextjs.png",
	date: "2022-03-10",
	slug: "getting-started-nextjs",
	content: "# This is a **firts** post",
};

export default function PostContent({ post }) {
	const imagePath = `/images/posts/${post.slug}/${post.image}`;

	const customRenderers = {
		// img(image) {
		// 	return (
		// 		<Image
		// 			src={`/images/posts/${post.slug}/${image.src}`}
		// 			alt={image.alt}
		// 			width={600}
		// 			height={300}
		// 		/>
		// 	);
		// },
		p(paragraph) {
			const { node } = paragraph;

			if (node.children[0].tagName === "img") {
				const image = node.children[0];

				return (
					<div className={classes.image}>
						<Image
							src={`/images/posts/${post.slug}/${image.properties.src}`}
							alt={image.alt}
							width={600}
							height={300}
						/>
					</div>
				);
			}
			return <p>{paragraph.children}</p>;
		},
		code(code) {
			const { className, children } = code;
			const language = className.split("-")[1]; // className is something like language-js => We need the "js" part here
			return (
				<SyntaxHighlighter
					style={atomDark}
					language={language}
					children={children}
				/>
			);
		},
	};

	return (
		<article className={classes.content}>
			<PostHeader title={post.title} image={imagePath} />
			<ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
		</article>
	);
}
