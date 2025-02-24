import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

// Function to get user token safely
const getUserToken = () => {
    const token = localStorage.getItem("userToken");
    return token ? `Bearer ${token}` : "";
};

// Async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
    "adminProducts/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/products`, {
                headers: { Authorization: getUserToken() },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async function to create a new product
export const createProduct = createAsyncThunk(
    "adminProducts/createProduct",
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/admin/products/add-product`,
                productData,
                {
                    headers: { Authorization: getUserToken() },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunk to update an existing product
export const updateProduct = createAsyncThunk(
    "adminProducts/updateProduct",
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_URL}/api/admin/products/${id}`,
                productData,
                {
                    headers: { Authorization: getUserToken() },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk(
    "adminProducts/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/api/admin/products/${id}`, {
                headers: { Authorization: getUserToken() },
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Admin Products
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(
                    (product) => product._id === action.payload._id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Delete Product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (product) => product._id !== action.payload
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default adminProductSlice.reducer;
