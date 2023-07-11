import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";

import Button from "../ui/button";

export default function EventItem({ id, title, image, date, location }) {
	const humanReadableData = new Date(date).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const formattedAddress = location.replace(",", "\n");

	const exploreLink = `/events/${id}`;

	return (
		<li
			key={id}
			className='rounded-lg overflow-hidden bg-white m-4 flex flex-col gap-4 shadow-lg md:flex-row'>
			<img
				src={"/" + image}
				alt='event image'
				className='w-full object-cover h-40 md:w-2/5 md:h-56'
			/>
			<div className='w-full px-4 text-center md:w-3/5 md:p-0 md:text-left'>
				<div>
					<h2 className='my-2 md:my-4 font-bold text-2xl'>{title}</h2>
					<div className='flex gap-2 items-center'>
						<DateIcon />
						<time className=' my-2 font-bold text-zinc-500'>
							{humanReadableData}
						</time>
					</div>
					<div className='flex gap-2 items-center'>
						<AddressIcon />
						<address className='my-2 text-zinc-500 whitespace-pre'>
							{formattedAddress}
						</address>
					</div>
				</div>
				<div className='flex flex-col p-4 md:flex-row md:justify-end'>
					<Button link={exploreLink}>
						Explore Event <ArrowRightIcon />
					</Button>
				</div>
			</div>
		</li>
	);
}
