import Image from "next/image";
import classes from "./hero.module.css";

export default function Hero() {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image
					src='/moje.png'
					alt='An image showing Kamil'
					width={300}
					height={300}
				/>
			</div>
			<h1>Hi, I am Kamil</h1>
			<p>
				A blog about web development - especially frontend framework like React
			</p>
		</section>
	);
}
