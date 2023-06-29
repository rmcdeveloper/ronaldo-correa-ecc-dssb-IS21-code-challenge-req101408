import {
	Dispatch,
	SetStateAction,
	ChangeEvent,
	useState,
	useEffect,
} from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import type { Product } from "./ProductsTable";
import FormTemplate from "./Common/FormTemplate";
import { useUpdateProduct } from "../queries/products";
import { DropdownChangeEvent } from "primereact/dropdown";
import { CalendarChangeEvent } from "primereact/calendar";

type EditType = {
	show: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	product: Partial<Product>;
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

const EditModal = ({
	show,
	setShowModal,
	product,
	products,
	showError,
	showSuccess,
}: EditType) => {
	const { productName } = product;
	const [newProduct, setNewProduct] = useState<Partial<Product>>({});
	const panelHeader = <div className="block">Edit {productName}</div>;
	const { mutate, isError, isSuccess } = useUpdateProduct(newProduct);

	useEffect(() => {
		if (product) setNewProduct(product);
	}, [product]);

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

		setNewProduct((prevProduct) => ({
			...prevProduct,
			[name]: name === "methodology" ? value.name : value,
		}));
	};

	const handleDevelopers = (newDevelopers: string[]) => {
		setNewProduct((prevProduct) => ({
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
			<Button label="Update" onClick={handleFormSubmit} autoFocus />
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
			{newProduct ? (
				<FormTemplate
					handleChange={handleChange}
					handleDevelopers={handleDevelopers}
					product={newProduct}
				/>
			) : null}
		</Dialog>
	);
};

export default EditModal;
