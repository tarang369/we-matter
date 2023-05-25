import axios from 'axios';

const apiUrl = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
    const response = await axios.get(`${apiUrl}/products`);
    return response.data;
};

export const fetchProductById = async (productId) => {
    const response = await axios.get(`${apiUrl}/products/${productId}`);
    return response.data;
};

export const createProduct = async (product) => {
    const response = await axios.post(`${apiUrl}/products`, product);
    return response.data;
};

export const updateProduct = async (productId, product) => {
    const response = await axios.put(`${apiUrl}/products/${productId}`, product);
    return response.data;
};

export const deleteProduct = async (productId) => {
    const response = await axios.delete(`${apiUrl}/products/${productId}`);
    return response.data;
};

export const fetchUsers = async () => {
    const response = await axios.get(`${apiUrl}/users`);
    return response.data;
};
