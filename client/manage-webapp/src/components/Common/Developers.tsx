import { useState } from "react";
import { Fieldset } from "primereact/fieldset";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface DevelopersProps {
	handleDevelopers: (newDevelopers: string[]) => void;
	developers: string[];
}

const Developers = ({ handleDevelopers, developers = [] }: DevelopersProps) => {
	const [newDevelopers, setNewDevelopers] = useState<string[]>(developers);
	const [developer, setDeveloper] = useState<string>("");

	const addDeveloper = () => {
		if (developer !== "" && newDevelopers.length < 5) {
			setNewDevelopers([...newDevelopers, developer]);
			handleDevelopers([...newDevelopers, developer]);
			setDeveloper("");
		}
	};

	const removeDeveloper = (developer: string) => {
		setNewDevelopers(newDevelopers.filter((item) => item !== developer));
		handleDevelopers(newDevelopers.filter((item) => item !== developer));
	};

	return (
		<div className="flex flex-column gap-4 pb-4">
			<Fieldset legend="Developers">
				<div>
					<InputText
						id="developers"
						value={developer}
						placeholder="Add developer"
						onChange={(e) => setDeveloper(e.target.value)}
						className="py-2"
					/>
					<Button icon="pi pi-plus" rounded outlined onClick={addDeveloper} />
					{newDevelopers?.map((developer, index) => (
						<div key={index}>
							<InputText readOnly value={developer} className="py-2" />
							<Button
								icon="pi pi-minus"
								outlined
								onClick={() => removeDeveloper(developer)}
							/>
						</div>
					))}
				</div>
				{newDevelopers.length === 5 && (
					<small className="block">Maximum of 5 developers reached.</small>
				)}
			</Fieldset>
		</div>
	);
};

export default Developers;
