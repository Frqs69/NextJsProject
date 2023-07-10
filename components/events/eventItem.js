import Link from "next/link";

export default function EventItem({ id, title, image, date, location }) {
	const humanReadableData = new Date(date).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const formattedAddress = location.replace(",", "\n");

	const exploreLink = `/events/${id}`;

	return (
		<li key={id}>
			<img src={"/" + image} alt='event image' />
			<div>
				<div>
					<h2>{title}</h2>
					<div>
						<time>{humanReadableData}</time>
					</div>
					<div>
						<address>{formattedAddress}</address>
					</div>
				</div>
				<div>
					<Link href={exploreLink}>Explore Event</Link>
				</div>
			</div>
		</li>
	);
}
