import Link from "next/link";

export default function MainHeader() {
	return (
		<header className='w-full flex justify-between items-baseline py-4 px-[10%] h-20 bg-[#202020]'>
			<div className='text-2xl text-[#94fdfd] h-full flex justify-center items-center md:text-4xl'>
				<Link href='/'>NextEvents</Link>
			</div>
			<nav>
				<ul>
					<li className='text-[#74dacc] md:text-2xl'>
						<Link href='/events'>Browse All Events</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
