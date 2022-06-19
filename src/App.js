import { useState, useEffect, useCallback } from "react";
import { BiArchive } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppoitmentInfo from "./components/AppointmentInfo";

function App() {
	let [appointmentList, setAppointmentList] = useState([]);

	const fetchData = useCallback(() => {
		fetch("./data.json")
			.then((response) => response.json())
			.then((data) => {
				setAppointmentList(data);
			});
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);
	return (
		<div className="App container mx-auto mt-3 font-thin">
			<h1 className="text-5xl mb-3">
				<BiArchive className="inline-block text-red-500 align-center mr-3" />
				My Appointments
			</h1>
			<AddAppointment />
			<Search />
			<ul className="divide-y divide-gray-300">
				{appointmentList.map((appointment) => (
					<AppoitmentInfo key={appointment.id} appointment={appointment} />
				))}
			</ul>
		</div>
	);
}

export default App;
