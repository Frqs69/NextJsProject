import { useRef, useState, useEffect } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

const sendContactData = async (contactDetails) => {
	const response = await fetch("/api/contact", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(contactDetails),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Something went wrong");
	}
};

export default function ContactForm() {
	const emailRef = useRef();
	const nameRef = useRef();
	const messageRef = useRef();
	const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'

	useEffect(() => {
		if (requestStatus === "success" || requestStatus === "error") {
			const timer = setTimeout(() => {
				setRequestStatus(null);
			}, 3000);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [requestStatus]);

	const sendMessage = async (e) => {
		e.preventDefault();

		setRequestStatus("pending");

		const contactData = {
			email: emailRef.current.value,
			name: nameRef.current.value,
			message: messageRef.current.value,
		};

		try {
			await sendContactData(contactData);
			emailRef.current.value = "";
			nameRef.current.value = "";
			messageRef.current.value = "";
			setRequestStatus("success");
		} catch (err) {
			setRequestStatus("error");
		}
	};

	let notification;

	if (requestStatus === "pending") {
		notification = {
			status: "pending",
			title: "Sending message...",
			message: "Your message is on its way!",
		};
	}
	if (requestStatus === "success") {
		notification = {
			status: "success",
			title: "Success!",
			message: "Message sent successfully!",
		};
	}
	if (requestStatus === "error") {
		notification = {
			status: "error",
			title: "Error!",
			message: "Something went wrong!",
		};
	}

	return (
		<section className={classes.contact}>
			<h1>How can I help you?</h1>
			<form className={classes.form} onSubmit={sendMessage}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor='email'>Your Email</label>
						<input ref={emailRef} type='email' id='email' required />
					</div>
					<div className={classes.control}>
						<label htmlFor='name'>Your Name</label>
						<input ref={nameRef} type='text' id='name' required />
					</div>
				</div>
				<div className={classes.control}>
					<label htmlFor='message'>Your message</label>
					<textarea ref={messageRef} id='message' rows='5' required></textarea>
				</div>
				<div className={classes.actions}>
					<button>Send Message</button>
				</div>
			</form>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
		</section>
	);
}
