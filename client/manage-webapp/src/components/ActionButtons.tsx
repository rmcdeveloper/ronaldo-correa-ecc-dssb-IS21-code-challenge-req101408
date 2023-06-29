import { Button } from "primereact/button";

type ActionType = {
	enabled: boolean;
	onEdit: (param: boolean) => void;
	onDelete: (param: boolean) => void;
	onAdd: (param: boolean) => void;
};

const ActionButtons = ({ enabled, onDelete, onEdit, onAdd }: ActionType) => {
	return (
		<>
			<div className="flex flex-wrap gap-2">
				<Button label="Add" onClick={() => onAdd(true)} size="small" />
				<Button
					label="Edit"
					severity="secondary"
					disabled={!enabled}
					onClick={() => onEdit(true)}
					size="small"
				/>
				<Button
					label="Delete"
					severity="danger"
					disabled={!enabled}
					onClick={() => onDelete(true)}
					size="small"
				/>
			</div>
		</>
	);
};

export default ActionButtons;
