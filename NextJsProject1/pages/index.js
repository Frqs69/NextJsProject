import Head from "next/head";
// import { getFeaturedEvents } from "@/data";
import EventList from "@/components/events/eventList";
import { getFeaturedEvents } from "@/helpers/api-utils";

export default function Home(props) {
	return (
		<>
			<Head>
				<title>NextEvents</title>
			</Head>
			<EventList items={props.events} />
		</>
	);
}

export const getStaticProps = async () => {
	const featuredEvents = await getFeaturedEvents();

	return { props: { events: featuredEvents }, revalidate: 1800 };
};
