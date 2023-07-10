import Link from "next/link";
import { getFeaturedEvents } from "@/data";
import EventList from "@/components/events/eventList";

export default function Home() {
	const featuredEvents = getFeaturedEvents();
	return (
		<>
			<EventList items={featuredEvents} />
		</>
	);
}
