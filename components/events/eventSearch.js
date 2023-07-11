import { useRef } from "react";
import Button from "../ui/button";

export default function EventSearch({ onSearch }) {
	const yearInputRef = useRef();
	const monthInputRef = useRef();

	const submitHandler = (e) => {
		e.preventDefault();

		const selectedYear = yearInputRef.current.value;
		const selectedMonth = monthInputRef.current.value;

		onSearch(selectedYear, selectedMonth);
	};

	return (
		<form
			className='my-2 mx-auto shadow-lg p-4 rounded-md w-11/12 max-w-2xl flex justify-between flex-col gap-4 md:flex-row bg-white'
			onSubmit={submitHandler}>
			<div className='w-full flex gap-4 flex-col md:w-4/5 md:flex-row'>
				<div className='flex-1 flex gap-4 items-center justify-between'>
					<label className='font-bold text-black' htmlFor='year'>
						Year
					</label>
					<select
						className='bg-white rounded-md border w-8/12 p-1 md:w-full text-black'
						id='year'
						ref={yearInputRef}>
						<option value='2021'>2021</option>
						<option value='2022'>2022</option>
					</select>
				</div>
				<div className='flex-1 flex gap-4 items-center justify-between'>
					<label className='font-bold text-black' htmlFor='month'>
						Month
					</label>
					<select
						id='month'
						className='bg-white border rounded-md w-8/12 p-1 md:w-full text-black'
						ref={monthInputRef}>
						<option value='1'>January</option>
						<option value='2'>February</option>
						<option value='3'>March</option>
						<option value='4'>April</option>
						<option value='5'>May</option>
						<option value='6'>June</option>
						<option value='7'>July</option>
						<option value='8'>August</option>
						<option value='9'>September</option>
						<option value='10'>October</option>
						<option value='11'>November</option>
						<option value='12'>December</option>
					</select>
				</div>
			</div>
			<Button className='w-full py-1 px-2 md:w-1/5'>Find Events</Button>
		</form>
	);
}
