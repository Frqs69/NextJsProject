import EventItem from "./eventItem";

export default function EventList({ items }) {
	return (
		<ul>
			{items.map((item) => (
				<EventItem
					key={item.id}
					id={item.id}
					image={item.image}
					title={item.title}
					date={item.date}
					location={item.location}
				/>
			))}
		</ul>
	);
}
