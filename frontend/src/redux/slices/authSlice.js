import { createSlice, createAsyncThunk, isRejected} from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({username, password}, {rejectWithValue}) => {
        try {
            const apiURL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({username, password}),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur de connexion');
            }

            const data = await response.json();
            return data.user;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }

);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            navigate('/login');
        }
    },
    extraReducers: (builder) => {
    builder
        .addCase(loginUser.fulfilled, (state,action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            
        })
        .addCase(loginUser.rejected, (state,action) => {
        alert('Identifiants incorrects !');
        });
}
});

export const {loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;