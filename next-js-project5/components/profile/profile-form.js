import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm() {
	const oldPasswordRef = useRef();
	const newPasswordRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const oldPassword = oldPasswordRef.current.value;
		const newPassword = newPasswordRef.current.value;

		const res = await fetch("/api/user/change-password", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				oldPassword,
				newPassword,
			}),
		});

		const data = await res.json();

		console.log(data);
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<div className={classes.control}>
				<label htmlFor='new-password'>New Password</label>
				<input type='password' id='new-password' ref={newPasswordRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='old-password'>Old Password</label>
				<input type='password' id='old-password' ref={oldPasswordRef} />
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
}

export default ProfileForm;
