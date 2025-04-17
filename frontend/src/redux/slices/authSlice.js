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
import { toast } from "react-toastify";
 *
;
import 'react-toastify/dist/ReactToastify.css';
export const loginUser = createAsyncThunk('auth/loginUser', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ username, password }, { rejectWithValue }) {
    try {
        const apiURL = import.meta.env.VITE_API_URL;
        const response = yield fetch(`${apiURL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            const errorData = yield response.json();
            throw new Error(errorData.message || 'Erreur de connexion');
        }
        const data = yield response.json();
        return data.user;
    }
    catch (err) {
        return rejectWithValue(err.message);
    }
}));
export const checkAuth = createAsyncThunk('auth/checkAuth', (__1, _a) => __awaiter(void 0, [__1, _a], void 0, function* (__, { rejectWithValue }) {
    try {
        const apiURL = import.meta.env.VITE_API_URL;
        const response = yield fetch(`${apiURL}/auth/checkAuth`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = yield response.json();
            throw new Error(errorData.message || 'Non authentifié');
        }
        const data = yield response.json();
        return data.user;
    }
    catch (err) {
        return rejectWithValue(err.message);
    }
}));
export const logout = createAsyncThunk('auth/logout', (__1, _a) => __awaiter(void 0, [__1, _a], void 0, function* (__, { rejectWithValue }) {
    try {
        const apiURL = import.meta.env.VITE_API_URL;
        const response = yield fetch(`${apiURL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = yield response.json();
            throw new Error(errorData.message || 'Erreur lors de la déconnexion');
        }
        return true;
    }
    catch (err) {
        return rejectWithValue(err.message);
    }
}));
export const checkUsername = createAsyncThunk('auth/checkUsername', (username_1, _a) => __awaiter(void 0, [username_1, _a], void 0, function* (username, { rejectWithValue }) {
    try {
        const apiURL = import.meta.env.VITE_API_URL;
        const response = yield fetch(`${apiURL}/auth/checkUsername/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = yield response.json();
            throw new Error(errorData.message || 'Erreur lors de la vérification');
        }
        const data = yield response.json();
        return data;
    }
    catch (err) {
        return rejectWithValue(err.message);
    }
}));
export const register = createAsyncThunk('auth/regiter', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ username, password, email }, { rejectWithValue }) {
    try {
        const apiURL = import.meta.env.VITE_API_URL;
        const response = yield fetch(`${apiURL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email })
        });
        if (!response.ok) {
            const errorData = yield response.json();
            throw new Error(errorData.message || 'Erreur du serveur');
        }
        const data = yield response.json();
        return data;
    }
    catch (err) {
        return rejectWithValue(err.message);
    }
}));
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        isLoading: false,
        isUsernameAvailable: false,
        isRegister: false
    },
    reducers: {
        resetRegister: (state) => {
            state.isRegister = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
        })
            .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            toast.error('Identifiants incorrects !');
        })
            .addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(checkAuth.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
        })
            .addCase(checkAuth.rejected, (state, action) => {
            state.isAuthenticated = false;
            state.isLoading = false;
        })
            .addCase(logout.fulfilled, (state, action) => {
            state.isAuthenticated = false;
        })
            .addCase(checkUsername.pending, (state) => {
            state.isLoading = true;
            state.isUsernameAvailable = null;
        })
            .addCase(checkUsername.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isUsernameAvailable = action.payload;
        })
            .addCase(checkUsername.rejected, (state, action) => {
            state.isLoading = false;
            state.isUsernameAvailable = null;
        })
            .addCase(register.fulfilled, (state, action) => {
            state.isRegister = true;
        })
            .addCase(register.rejected, (state, action) => {
            toast.error(`${action.payload}`);
        });
    }
});
export const { resetRegister } = authSlice.actions;
export default authSlice.reducer;
