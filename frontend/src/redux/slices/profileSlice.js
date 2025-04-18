import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    error: null,
};
const getProfile = createAsyncThunk('profile/getProfile', async (__, { rejectWithValue }) => {
    try {
        const apiURL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiURL}/profile`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur serveur');
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        return rejectWithValue(err.message);
    }
});
const profile = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.fulfilled, (state, action) => {
            state.user = action.payload;
            console.log(state.user);
        })
            .addCase(getProfile.rejected, (state, action) => {
            state.user = null;
            state.error = action.payload;
        });
    }
});
export { getProfile };
export default profile.reducer;
