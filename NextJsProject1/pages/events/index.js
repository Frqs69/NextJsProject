// import { getAllEvents } from "@/data";
import { getAllEvents } from "@/helpers/api-utils";
import { useRouter } from "next/router";
import EventList from "@/components/events/eventList";

import EventSearch from "@/components/events/eventSearch";

export default function AllEvents(props) {
	const router = useRouter();
	const allEvents = props.events;

	const findEventsHandler = (year, month) => {
		const fullPath = `/events/${year}/${month}`;

		router.push(fullPath);
	};

	return (
		<>
			<EventSearch onSearch={findEventsHandler} />
			<EventList items={allEvents} />;
		</>
	);
}

export async function getStaticProps() {
	const allEvents = await getAllEvents();
	return {
		props: {
			events: allEvents,
		},
		revalidate: 60,
	};
}
