import path from "path";
import fs from "fs/promises";
import Link from "next/link";

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
				return (
					<li key={product.id}>
						<Link href={`/products/${product.id}`}>{product.title}</Link>
					</li>
				);
			})}
		</ul>
	);
}
