import { useState, useEffect, useCallback } from "react";
import { BiArchive } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppoitmentInfo from "./components/AppointmentInfo";

function App() {
	let [appointmentList, setAppointmentList] = useState([]);
	let [query, setQuery] = useState("");
	let [sortBy, setSortBy] = useState("petName");
	let [orderBy, setOrderBy] = useState("asc");

	const filteredAppointments = appointmentList
		.filter((item) => {
			return (
				item.petName.toLowerCase().includes(query.toLowerCase()) ||
				item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
				item.aptDate.toLowerCase().includes(query.toLowerCase())
			);
		})
		.sort((a, b) => {
			let order = orderBy === "asc" ? 1 : -1;
			return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
				? -1 * order
				: 1 * order;
		});

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
			<Search
				query={query}
				onQueryChange={(queryStr) => setQuery(queryStr)}
				sortBy={sortBy}
				onSortByChange={(sortByStr) => setSortBy(sortByStr)}
				orderBy={orderBy}
				onOrderByChange={(orderByStr) => setOrderBy(orderByStr)}
			/>
			<ul className="divide-y divide-gray-300">
				{filteredAppointments.map((appointment) => (
					<AppoitmentInfo
						key={appointment.id}
						appointment={appointment}
						onDeleteAppointment={(appointmentId) => {
							setAppointmentList(
								appointmentList.filter(
									(appointment) => appointment.id !== appointmentId
								)
							);
						}}
					/>
				))}
			</ul>
		</div>
	);
}

export default App;
