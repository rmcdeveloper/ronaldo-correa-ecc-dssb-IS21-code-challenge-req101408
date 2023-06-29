import React, { useState, ChangeEvent } from "react";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import type { Product } from "../ProductsTable";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import Developers from "./Developers";

type FormTemplateProps = {
	product?: Partial<Product>;
	handleChange: (
		event:
			| ChangeEvent<HTMLInputElement>
			| DropdownChangeEvent
			| CalendarChangeEvent
	) => void;
	handleDevelopers: (newDevelopers: string[]) => void;
};

interface Methodology {
	name?: string;
}

const methodologies: Methodology[] = [{ name: "Agile" }, { name: "Waterfall" }];

const FormTemplate = ({
	product,
	handleChange,
	handleDevelopers,
}: FormTemplateProps) => {
	const [selectedMethodology, setSelectedMethodology] = useState<Methodology>({
		name: product?.methodology,
	});
	const [date, setDate] = useState<Date>(new Date());

	const handleDateChange = (e: CalendarChangeEvent) => {
		const { value } = e.target;
		handleChange(e);
		setDate(value as Date);
	};

	const handleMethodologyChange = (e: DropdownChangeEvent) => {
		const { value } = e.target;
		setSelectedMethodology(value);
		handleChange(e);
	};

	return (
		<Panel header="Product form">
			<div className="flex flex-column gap-2 pb-4">
				<InputText
					placeholder="Product name"
					name="productName"
					value={product?.productName}
					onChange={handleChange}
					required
				/>
				<small>Enter a unique name for the project.</small>
			</div>
			<div className="flex flex-column gap-2 pb-4">
				<InputText
					placeholder="Product owner"
					name="productOwnerName"
					value={product?.productOwnerName}
					onChange={handleChange}
					required
				/>
				<small>Enter the project's owner name.</small>
			</div>
			<div className="flex flex-column gap-2 pb-4">
				<InputText
					placeholder="Scrum master"
					name="scrumMasterName"
					value={product?.scrumMasterName}
					onChange={handleChange}
					required
				/>
				<small>Enter the Scrum master name.</small>
			</div>
			<div className="flex flex-column md:flex-row gap-3">
				<div className="flex-grow pb-4">
					<Dropdown
						value={selectedMethodology}
						onChange={handleMethodologyChange}
						options={methodologies}
						optionLabel="name"
						placeholder="Select a methodology"
						className="w-full md:w-14rem"
						name="methodology"
					/>
				</div>
				<div className="flex-grow justify-content-center">
					<Calendar
						value={date}
						onChange={handleDateChange}
						placeholder="Start date selection"
						name="startDate"
					/>
				</div>
			</div>
			<Developers
				handleDevelopers={handleDevelopers}
				developers={product?.developers || []}
			/>
			<div className="flex flex-column gap-2 pb-4">
				<InputText
					placeholder="Location"
					name="location"
					value={product?.location}
					onChange={handleChange}
					required
				/>
				<small>Enter the project's location on GitHub.</small>
			</div>
		</Panel>
	);
};

export default FormTemplate;
