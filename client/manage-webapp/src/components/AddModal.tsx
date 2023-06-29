import React, {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useState,
	useEffect,
} from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import type { Product } from "./ProductsTable";
import FormTemplate from "./Common/FormTemplate";
import { useAddProduct } from "../queries/products";
import { DropdownChangeEvent } from "primereact/dropdown";
import { CalendarChangeEvent } from "primereact/calendar";

type AddType = {
	show: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	products: Product[];
	showError: () => void;
	showSuccess: () => void;
};

const initialProduct = {
	productName: "",
	productOwnerName: "",
	developers: [],
	scrumMasterName: "",
	startDate: new Date(),
	methodology: "",
	location: "",
};

const AddModal = ({
	show,
	setShowModal,
	products,
	showError,
	showSuccess,
}: AddType) => {
	const [product, setProduct] = useState<Partial<Product>>(initialProduct);
	const panelHeader = <div className="block">Add new product</div>;
	const { mutate, isSuccess, isError } = useAddProduct(product);

	useEffect(() => {
		if (isError) showError();
	}, [isError]);

	useEffect(() => {
		if (isSuccess) showSuccess();
	}, [isSuccess]);

	const handleChange = (
		event:
			| ChangeEvent<HTMLInputElement>
			| CalendarChangeEvent
			| DropdownChangeEvent
	) => {
		const { name, value } = event.target;

		if (name === "productName") {
			const sameName = products.some(
				(product) => product.productName === value
			);

			if (sameName) return <>Choose a different Name</>;
		}

		setProduct((prevProduct) => ({
			...prevProduct,
			[name]: name === "methodology" ? value.name : value,
		}));
	};

	const handleDevelopers = (newDevelopers: string[]) => {
		setProduct((prevProduct) => ({
			...prevProduct,
			developers: newDevelopers,
		}));
	};

	const handleFormSubmit = () => {
		mutate();
		setShowModal(false);
	};

	const footerContent = (
		<div>
			<Button
				label="Cancel"
				onClick={() => setShowModal(false)}
				className="p-button-text"
			/>
			<Button label="Submit" onClick={handleFormSubmit} autoFocus />
		</div>
	);

	return (
		<Dialog
			header={panelHeader}
			visible={show}
			style={{ width: "50vw" }}
			onHide={() => setShowModal(false)}
			footer={footerContent}
		>
			<FormTemplate
				handleChange={handleChange}
				handleDevelopers={handleDevelopers}
			/>
		</Dialog>
	);
};

export default AddModal;
