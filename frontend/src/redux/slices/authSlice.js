import { createSlice, createAsyncThunk, isRejected} from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({username, password}, {rejectWithValue}) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
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
        }
    },
    extraReducers: (builder) => {
    builder
        .addCase(loginUser.fulfilled, (state,action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(loginUser.rejected, (state,action) => {
            alert(`${action.payload}`);
        });
}
});

export const {loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;