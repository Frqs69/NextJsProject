import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
// import { getEventById } from "@/data";
// import { useRouter } from "next/router";
import { getEventById, getFeaturedEvents } from "@/helpers/api-utils";
import ErrorAlert from "@/components/ui/error-alert";
import Head from "next/head";
import Comments from "@/components/input/comments";

export default function EventDetailPage(props) {
	const event = props.event;

	if (!event) {
		return <ErrorAlert>Loading...</ErrorAlert>;
	}

	return (
		<>
			<Head>
				<title>{event.title}</title>
			</Head>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
			<Comments eventId={event.id} />
		</>
	);
}

export const getStaticProps = async (context) => {
	const eventId = context.params.eventId;
	const event = await getEventById(eventId);
	return { props: { event: event }, revalidate: 30 };
};

export const getStaticPaths = async () => {
	const events = await getFeaturedEvents();
	const paths = events.map((event) => ({ params: { eventId: event.id } }));

	return {
		paths,
		fallback: true,
	};
};
