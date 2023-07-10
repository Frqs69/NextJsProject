import Link from "next/link";

export default function Button({ link, children }) {
	return (
		<Link
			href={link}
			className='cursor-pointer bg-[#03be9f] border-[#03be9f] rounded-md text-[#dafff7] py-2 px-6 text-center shadow-xl hover:bg-[#02afa1] hover:border-[#02afa1] flex gap-2 items-center'>
			{children}
		</Link>
	);
}
