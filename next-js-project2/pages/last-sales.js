import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function LastSales(props) {
	const [sales, setSales] = useState(props.sales);

	const { data, error } = useSWR(
		`https://nextjs-course-fdac9-default-rtdb.europe-west1.firebasedatabase.app/sales.json`,
		fetcher
	);

	useEffect(() => {
		if (data) {
			const transformedData = [];

			for (const key in data) {
				transformedData.push({
					id: key,
					username: data[key].username,
					value: data[key].value,
				});
			}
			setSales(transformedData);
		}
	}, [data]);

	if (error) return <div>Failed to load</div>;
	if (!data && !sales) return <div>Loading...</div>;

	//! CUSTOM HOOK
	// useEffect(() => {
	// 	let isSubscribed = true;

	// 	const fetchData = async () => {
	// 		const res = await fetch(
	// 			`https://nextjs-course-fdac9-default-rtdb.europe-west1.firebasedatabase.app/sales.json`
	// 		);

	// 		const data = await res.json();

	// 		const transformedData = [];

	// 		for (const key in data) {
	// 			transformedData.push({
	// 				id: key,
	// 				username: data[key].username,
	// 				value: data[key].value,
	// 			});
	// 		}

	// 		if (isSubscribed) {
	// 			setSales(transformedData);
	// 		}
	// 	};

	// 	fetchData().catch(console.error);

	// 	return () => (isSubscribed = false);
	// }, []);

	// if (!sales) {
	// 	return <p>Loading</p>;
	// }

	return (
		<ul>
			{sales.map((sale) => (
				<li key={sale.id}>
					{sale.username} bought {sale.value}
				</li>
			))}
		</ul>
	);
}

export async function getStaticProps() {
	const res = await fetch(
		`https://nextjs-course-fdac9-default-rtdb.europe-west1.firebasedatabase.app/sales.json`
	);

	const data = await res.json();

	const transformedData = [];
	for (const key in data) {
		transformedData.push({
			id: key,
			username: data[key].username,
			value: data[key].value,
		});
	}

	return { props: { sales: transformedData }, revalidate: 10 };
}
