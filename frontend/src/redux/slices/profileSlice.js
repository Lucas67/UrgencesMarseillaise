var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const getProfile = createAsyncThunk('profile/getProfile', (__1, _a) => __awaiter(void 0, [__1, _a], void 0, function* (__, { rejectWithValue }) {
    try {
        const apiURL = import.meta.env.VITE_API_URL;
        const response = yield fetch(`${apiURL}/profile`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = yield response.json();
            throw new Error(errorData.message || 'Erreur serveur');
        }
        const data = yield response.json();
        return data;
    }
    catch (err) {
        return rejectWithValue(err.message);
    }
}));
const profile = createSlice({
    name: 'profile',
    initialState: {
        user: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.fulfilled, (state, action) => {
            console.log("Données du profil récupérées :", action.payload);
            state.user = action.payload.user;
        })
            .addCase(getProfile.rejected, (state, action) => {
            console.log("Erreur lors de la récupération du profil :", action.payload);
            state.user = null;
            state.error = action.payload;
        });
    }
});
export { getProfile };
export default profile.reducer;
