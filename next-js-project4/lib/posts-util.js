import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

function getPostData(fileName) {
	const filePath = path.join(postsDirectory, fileName);
	const fileContent = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(fileContent);

	// remove file extension for slug
	const postSlug = fileName.replace(/\.md$/, "");

	const postData = {
		slug: postSlug,
		...data,
		content,
	};

	return postData;
}

function getAppPosts() {
	const postsFiles = fs.readdirSync(postsDirectory);

	const allPosts = postsFiles.map((postFile) => {
		return getPostData(postFile);
	});

	const sortedPosts = allPosts.sort((postA, postB) =>
		postA.date > postB.date ? -1 : 1
	);

	return sortedPosts;
}

function getFeaturedPosts() {
	const allPosts = getAppPosts();

	const featuredPosts = allPosts.filter((post) => post.isFeatured);

	return featuredPosts;
}
