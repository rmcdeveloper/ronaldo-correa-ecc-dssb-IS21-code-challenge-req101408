import { useQuery, useMutation, useQueryClient } from "react-query";
import type { Product } from "../components/ProductsTable";
import axios from "axios";

enum ProductsKeys {
	LIST_PRODUCTS = "list-products",
}

/****
 * Get all products from the API
 */
export const useProducts = () => {
	return useQuery<Product[], Error>({
		queryKey: [ProductsKeys.LIST_PRODUCTS],
		queryFn: async (): Promise<Product[]> => {
			const { data } = await axios.get("/api/products/");
			return data;
		},
	});
};

/****
 * Delete a selected product from the API
 */
export const useDeleteProduct = (productId: number) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => await axios.delete(`api/products/${productId}`),
		onSuccess: () => {
			queryClient.invalidateQueries([ProductsKeys.LIST_PRODUCTS]);
		},
	});
};

/****
 * Add new product to the API
 */
export const useAddProduct = (newProduct: Partial<Product>) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (): Promise<Product> =>
			await axios.post("api/products/", newProduct),
		onSuccess: () => {
			queryClient.invalidateQueries([ProductsKeys.LIST_PRODUCTS]);
		},
	});
};

/****
 * Update a selected product to the API
 */
export const useUpdateProduct = (product: Partial<Product>) => {
	const queryClient = useQueryClient();

	return useMutation<Product, Error>({
		mutationFn: async (): Promise<Product> =>
			await axios.put(`api/products/${product.productId}`, product),
		onSuccess: () => {
			queryClient.invalidateQueries([ProductsKeys.LIST_PRODUCTS]);
		},
	});
};
