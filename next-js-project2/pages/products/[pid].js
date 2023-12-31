import path from "path";
import fs from "fs/promises";

const getData = async () => {
	const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	return data;
};

export async function getStaticProps({ params }) {
	const productId = params.pid;

	const data = await getData();

	const product = data.products.find((data) => data.id === productId);

	if (!product) {
		return { notFound: true };
	}

	return {
		props: {
			loadedProduct: product,
		},
	};
}

export async function getStaticPaths() {
	const data = await getData();

	const ids = data.products.map((data) => data.id);

	const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

	return {
		paths: pathsWithParams,
		fallback: true,
	};
}

export default function ProductDetailPage({ loadedProduct }) {
	if (!loadedProduct) {
		return <p>Loading...</p>;
	}
	return (
		<>
			<h1>{loadedProduct.title}</h1>
			<p>{loadedProduct.description}</p>
		</>
	);
}
