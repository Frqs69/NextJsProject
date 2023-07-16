import Link from "next/link";
// import { getFeaturedEvents } from "@/data";
import EventList from "@/components/events/eventList";
import { getFeaturedEvents } from "@/helpers/api-utils";

export default function Home(props) {
	return (
		<>
			<EventList items={props.events} />
		</>
	);
}

export const getStaticProps = async () => {
	const featuredEvents = await getFeaturedEvents();

	return { props: { events: featuredEvents }, revalidate: 1800 };
};
