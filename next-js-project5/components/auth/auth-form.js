import { useState, useRef } from "react";
import classes from "./auth-form.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const createUser = async (email, password) => {
	const res = await fetch("/api/auth/signup", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Something went wrong");
	}

	return data;
};

function AuthForm() {
	const [isLogin, setIsLogin] = useState(true);
	const emailRef = useRef();
	const passwordRef = useRef();
	const router = useRouter();

	function switchAuthModeHandler() {
		setIsLogin((prevState) => !prevState);
	}

	const submitHandler = async (e) => {
		e.preventDefault();

		const enteredEmail = emailRef.current.value;
		const enteredPassword = passwordRef.current.value;

		if (isLogin) {
			const result = await signIn("credentials", {
				redirect: false,
				email: enteredEmail,
				password: enteredPassword,
			});

			if (!result.error) {
				router.replace("/profile");
			}
		} else {
			let res;
			try {
				res = await createUser(enteredEmail, enteredPassword);
				console.log(res);
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? "Login" : "Sign Up"}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='email'>Your Email</label>
					<input ref={emailRef} type='email' id='email' required />
				</div>
				<div className={classes.control}>
					<label htmlFor='password'>Your Password</label>
					<input ref={passwordRef} type='password' id='password' required />
				</div>
				<div className={classes.actions}>
					<button>{isLogin ? "Login" : "Create Account"}</button>
					<button
						type='button'
						className={classes.toggle}
						onClick={switchAuthModeHandler}>
						{isLogin ? "Create new account" : "Login with existing account"}
					</button>
				</div>
			</form>
		</section>
	);
}

export default AuthForm;
