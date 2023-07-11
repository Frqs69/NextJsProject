import Link from "next/link";
import { getFilteredEvents } from "@/data";
import { useRouter } from "next/router";
import EventList from "@/components/events/eventList";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";

export default function FilteredEventPage() {
	const router = useRouter();
	const filteredData = router.query.slug;

	if (!filteredData) {
		return <p className='m-auto text-center text-black'>Loading...</p>;
	}

	const filteredYear = +filteredData[0];
	const filteredMonth = +filteredData[1];

	if (
		isNaN(filteredYear) ||
		isNaN(filteredMonth) ||
		filteredYear > 2030 ||
		filteredYear < 2021 ||
		filteredMonth < 1 ||
		filteredMonth > 12
	) {
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

	const filteredEvents = getFilteredEvents({
		year: filteredYear,
		month: filteredMonth,
	});

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

	const date = new Date(filteredYear, filteredMonth - 1);

	return (
		<>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	);
}
