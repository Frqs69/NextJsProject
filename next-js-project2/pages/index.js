import path from "path";
import fs from "fs/promises";

export async function getStaticProps() {
	const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	return {
		props: {
			products: data.products,
		},
		revalidate: 10,
	};
}

export default function Home({ products }) {
	return (
		<ul>
			{products.map((product) => {
				return <li key={product.id}>{product.title}</li>;
			})}
		</ul>
	);
}
