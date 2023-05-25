import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/fakeStoreApi';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await api.fetchProducts();
    return response;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId) => {
    const response = await api.fetchProductById(productId);
    return response;
});

export const createNewProduct = createAsyncThunk('products/createNewProduct', async (product) => {
    const response = await api.createProduct(product);
    return response;
});

export const updateExistingProduct = createAsyncThunk('products/updateExistingProduct', async ({ productId, product }) => {
    const response = await api.updateProduct(productId, product);
    return response;
});

export const deleteProductById = createAsyncThunk('products/deleteProductById', async (productId) => {
    const response = await api.deleteProduct(productId);
    return response;
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        currentProduct: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createNewProduct.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateExistingProduct.fulfilled, (state, action) => {
                const updatedProduct = action.payload;
                const existingProduct = state.list.find((product) => product.id === updatedProduct.id);
                if(existingProduct) {
                    Object.assign(existingProduct, updatedProduct);
                }
            })
            .addCase(deleteProductById.fulfilled, (state, action) => {
                const deletedProductId = action.payload;
                state.list = state.list.filter((product) => product.id !== deletedProductId);
            });
    },
});

export const selectAllProducts = (state) => state.products.list;
export const selectCategories = (state) => {
    const categories = new Set();
    state.products.list.forEach((product) => categories.add(product.category));
    return Array.from(categories);
};

export const selectProductDetails = (state) => state.products.currentProduct;

export default productsSlice.reducer;
