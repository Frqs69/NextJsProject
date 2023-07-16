import Link from "next/link";
// import { getFilteredEvents } from "@/data";
import { useRouter } from "next/router";
import EventList from "@/components/events/eventList";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/helpers/api-utils";

export default function FilteredEventPage(props) {
	// if (!filteredEvents) {
	// 	return <p className='m-auto text-center text-black'>Loading...</p>;
	// }

	if (props.hasError) {
		return (
			<>
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values!</p>
				</ErrorAlert>
				<Button
					link='/events'
					className='mx-auto w-1/12 flex justify-center items-center'>
					Go back
				</Button>
			</>
		);
	}

	const filteredEvents = props.events;

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<>
				<ErrorAlert>
					<p>No events found for the chosen filter</p>
				</ErrorAlert>
				<Button
					link='/events'
					className='mx-auto w-1/12 flex justify-center items-center'>
					Go back
				</Button>
			</>
		);
	}

	const date = new Date(props.date.year, props.date.month - 1);

	return (
		<>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	);
}

export const getServerSideProps = async (context) => {
	const { params } = context;

	const filterData = params.slug;

	const filteredYear = +filterData[0];
	const filteredMonth = +filterData[1];

	if (
		isNaN(filteredYear) ||
		isNaN(filteredMonth) ||
		filteredYear > 2030 ||
		filteredYear < 2021 ||
		filteredMonth < 1 ||
		filteredMonth > 12
	) {
		return {
			props: { hasError: true },
		};
	}

	const filteredEvents = await getFilteredEvents({
		year: filteredYear,
		month: filteredMonth,
	});

	return {
		props: {
			events: filteredEvents,
			date: {
				year: filteredYear,
				month: filteredMonth,
			},
		},
	};
};
