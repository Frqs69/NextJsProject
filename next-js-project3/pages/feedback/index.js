import { useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

export default function FeedbackPage(props) {
	const [feedbackItem, setFeedbackItem] = useState();

	const loadFeedbackHandler = (id) => {
		fetch(`/api/${id}`)
			.then((response) => response.json())
			.then((data) => setFeedbackItem(data.feedback));
	};

	return (
		<>
			{feedbackItem && <p>{feedbackItem.email}</p>}
			<ul>
				{props.feedbackItems.map((item) => (
					<li key={item.id}>
						{item.email} {item.text}
						<button onClick={loadFeedbackHandler.bind(null, item.id)}>
							Show Details
						</button>
					</li>
				))}
			</ul>
		</>
	);
}

export const getStaticProps = async () => {
	const filePath = buildFeedbackPath();
	const data = extractFeedback(filePath);
	return {
		props: {
			feedbackItems: data,
		},
	};
};
