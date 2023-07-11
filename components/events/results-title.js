import Button from "../ui/button";

function ResultsTitle({ date }) {
	const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	});

	return (
		<section className='my-8 mx-auto max-w-2xl text-center'>
			<h1 className='text-3xl mb-8'>Events in {humanReadableDate}</h1>
			<Button link='/events' className='md:w-3/12 md:mx-auto'>
				Show all events
			</Button>
		</section>
	);
}

export default ResultsTitle;
