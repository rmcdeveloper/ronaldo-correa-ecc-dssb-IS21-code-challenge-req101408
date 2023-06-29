import { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import type { Product } from "./ProductsTable";
import { useDeleteProduct } from "../queries/products";
import { ProgressSpinner } from "primereact/progressspinner";

type DeleteType = {
	show: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	product: Product;
	showError: () => void;
	showSuccess: () => void;
};

const DeleteModal = ({
	show,
	setShowModal,
	product,
	showError,
	showSuccess,
}: DeleteType) => {
	const { productName, productId } = product;
	const { mutate, isError, isSuccess } = useDeleteProduct(productId);
	const panelHeader = <div className="block">Delete confirmation</div>;

	useEffect(() => {
		if (isError) showError();
	}, [isError]);

	useEffect(() => {
		if (isSuccess) showSuccess();
	}, [isSuccess]);

	const onDelete = () => {
		setShowModal(false);
		mutate();
	};

	const footerContent = (
		<div>
			<Button
				label="No"
				onClick={() => setShowModal(false)}
				className="p-button-text"
			/>
			<Button label="Yes" onClick={onDelete} autoFocus />
		</div>
	);

	return (
		<Dialog
			header={panelHeader}
			visible={show}
			style={{ width: "600px" }}
			onHide={() => setShowModal(false)}
			footer={footerContent}
			className="mx-3"
		>
			<p className="m-0">Are you sure you want to delete {productName}?</p>
		</Dialog>
	);
};

export default DeleteModal;
