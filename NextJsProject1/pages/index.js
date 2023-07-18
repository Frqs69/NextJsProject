import Head from "next/head";
// import { getFeaturedEvents } from "@/data";
import EventList from "@/components/events/eventList";
import { getFeaturedEvents } from "@/helpers/api-utils";
import NewsletterRegistration from "@/components/input/newsletter-registration";

export default function Home(props) {
	return (
		<>
			<Head>
				<title>NextEvents</title>
			</Head>
			<NewsletterRegistration />
			<EventList items={props.events} />
		</>
	);
}

export const getStaticProps = async () => {
	const featuredEvents = await getFeaturedEvents();

	return { props: { events: featuredEvents }, revalidate: 1800 };
};
