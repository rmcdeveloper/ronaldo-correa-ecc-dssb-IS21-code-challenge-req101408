import { useProducts } from "../queries/products";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import ProductsTable from "./ProductsTable";
import TitleBar from "./TitleBar";

const Products = () => {
	const { data = [], isLoading, isError, error } = useProducts();

	if (isLoading) return <ProgressSpinner />;

	if (isError) return <Message severity="error" text={error.message} />;

	return (
		<>
			<TitleBar />
			<div className="container">
				<ProductsTable products={data} />
			</div>
		</>
	);
};

export default Products;
