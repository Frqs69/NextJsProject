import { getAllEvents } from "@/data";
import { useRouter } from "next/router";
import EventList from "@/components/events/eventList";
import Link from "next/link";
import EventSearch from "@/components/events/eventSearch";

export default function AllEvents() {
	const allEvents = getAllEvents();
	const router = useRouter();

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
