import { useRef } from "react";

export default function Home() {
	const emailInputRef = useRef();
	const feedbackInputRef = useRef();

	const submitFormHandler = (e) => {
		e.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredFeedback = feedbackInputRef.current.value;

		const reqBody = { email: enteredEmail, feedback: enteredFeedback };

		fetch("/api/feedback", {
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: { "Content-Type": "application/json}" },
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
	};

	return (
		<>
			<h1>Home Page</h1>
			<form onSubmit={submitFormHandler}>
				<div>
					<label htmlFor='email'>Email Address:</label>
					<input
						type='email'
						id='email'
						className='border mb-4'
						ref={emailInputRef}
					/>
				</div>
				<div>
					<label htmlFor='feedback'>Your Feedback</label>
					<textarea
						rows='5'
						id='feedback'
						className='border mb-4'
						ref={feedbackInputRef}></textarea>
				</div>
				<button className='border'>Send Feedback</button>
			</form>
		</>
	);
}
