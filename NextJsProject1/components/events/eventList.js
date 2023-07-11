import EventItem from "./eventItem";

export default function EventList({ items }) {
	return (
		<ul className='w-11/12 max-w-2xl my-20 mx-auto'>
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
