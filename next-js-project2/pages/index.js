export async function getStaticProps() {
	return {
		props: {
			products: [{ id: "p1", title: "Product 1" }],
		},
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
