import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

// Function to get user token safely
const getUserToken = () => {
    const token = localStorage.getItem("userToken");
    return token ? `Bearer ${token}` : "";
};

// Fetch all users (admin only)
export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/users`, {
                headers: { Authorization: getUserToken() },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Add a new user
export const addUser = createAsyncThunk(
    "admin/addUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/admin/users`,
                userData,
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

// Update user info
export const updateUser = createAsyncThunk(
    "admin/updateUser",
    async ({ id, name, email, role }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_URL}/api/admin/users/${id}`,
                { name, email, role },
                {
                    headers: { Authorization: getUserToken() },
                }
            );
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Delete a user
export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/api/admin/users/${id}`, {
                headers: { Authorization: getUserToken() },
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add User
            .addCase(addUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload.user);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update User
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const userIndex = state.users.findIndex(
                    (user) => user._id === updatedUser._id
                );
                if (userIndex !== -1) {
                    state.users[userIndex] = updatedUser;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Delete User
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user._id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default adminSlice.reducer;
