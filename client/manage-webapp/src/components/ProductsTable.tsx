import React, { useState, useRef } from "react";
import {
	DataTable,
	DataTableExpandedRows,
	DataTableValueArray,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import ActionButtons from "./ActionButtons";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import AddModal from "./AddModal";
import { Toast } from "primereact/toast";

export interface Product {
	productId: number;
	productName: string;
	productOwnerName: string;
	developers: string[];
	scrumMasterName: string;
	startDate: Date;
	methodology: string;
	location: string;
}

const ProductsTable: React.FC<{ products: Product[] }> = ({ products }) => {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const [expandedRows, setExpandedRows] = useState<
		DataTableExpandedRows | DataTableValueArray | undefined
	>(undefined);

	const toastSuccessRef = useRef<Toast>(null);
	const showSuccess = () => {
		toastSuccessRef.current?.show({
			severity: "success",
			summary: "Success",
			detail: "Operation succeed",
			life: 3000,
		});
	};

	const toastErrorRef = useRef<Toast>(null);
	const showError = () => {
		toastErrorRef.current?.show({
			severity: "error",
			summary: "Error",
			detail: "Operation failed",
			life: 3000,
		});
	};

	const tableFooter = `Products total: ${products.length}`;

	const onEdit = (value: boolean) => setShowEditModal(value);
	const onDelete = (value: boolean) => setShowDeleteModal(value);
	const onAdd = (value: boolean) => setShowAddModal(value);

	const panelHeader = (
		<div className="block">
			<h2>BC Webapps</h2>
			<h4>Select a product to delete or update</h4>
			<ActionButtons
				enabled={selectedProduct !== null}
				onDelete={onDelete}
				onEdit={onEdit}
				onAdd={onAdd}
			/>
		</div>
	);

	const developersExpansion = (data: Product) => {
		return (
			<>
				<h5>List of developers for {data.productName}:</h5>
				<ul>
					{data.developers.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</>
		);
	};

	const allowExpansion = (rowData: Product) => {
		return rowData.developers!.length > 0;
	};

	return (
		<>
			<Toast ref={toastErrorRef} />
			<Toast ref={toastSuccessRef} />
			<Panel header={panelHeader}>
				<DataTable
					expandedRows={expandedRows}
					onRowToggle={(e) => setExpandedRows(e.data)}
					value={products}
					tableStyle={{ minWidth: "70rem" }}
					footer={tableFooter}
					size="small"
					paginator
					rows={10}
					rowsPerPageOptions={[10, 20, 30, 40]}
					stripedRows
					selection={selectedProduct!}
					dataKey="productId"
					onSelectionChange={(e) => {
						const value = e.value as Product;
						setSelectedProduct(value);
					}}
					rowExpansionTemplate={developersExpansion}
				>
					<Column
						selectionMode="single"
						headerStyle={{ width: "3rem" }}
					></Column>
					<Column field="productId" sortable header="Id"></Column>
					<Column field="productName" sortable header="Name"></Column>
					<Column field="productOwnerName" sortable header="Owner"></Column>
					<Column expander={allowExpansion} header="Developers" />
					<Column
						field="scrumMasterName"
						sortable
						header="Scrum master"
					></Column>
					<Column field="startDate" sortable header="Start date"></Column>
					<Column field="methodology" sortable header="Methodology"></Column>
					<Column field="location" sortable header="Location"></Column>
				</DataTable>
			</Panel>
			<AddModal
				show={showAddModal}
				setShowModal={setShowAddModal}
				products={products}
				showSuccess={showSuccess}
				showError={showError}
			/>
			{selectedProduct ? (
				<>
					<EditModal
						show={showEditModal}
						setShowModal={setShowEditModal}
						product={selectedProduct}
						products={products}
						showSuccess={showSuccess}
						showError={showError}
					/>
					<DeleteModal
						show={showDeleteModal}
						setShowModal={setShowDeleteModal}
						product={selectedProduct}
						showSuccess={showSuccess}
						showError={showError}
					/>
				</>
			) : null}
		</>
	);
};

export default ProductsTable;
