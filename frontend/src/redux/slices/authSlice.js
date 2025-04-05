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

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (__,{rejectWithValue}) => {
        try {
            const apiURL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiURL}/auth/checkAuth`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Non authentifié');
            }

            const data = await response.json();
            return data.user;
        } catch(err) {
            return rejectWithValue(err.message);
        }
    });

export const logout = createAsyncThunk(
    'auth/logout',
    async(__,{rejectWithValue}) =>{
        try {
         const apiURL = import.meta.env.VITE_API_URL;
         const response = await fetch(`${apiURL}/auth/logout`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
         })

         if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de la déconnexion');
         }

         return true;
        } catch(err) {
            return rejectWithValue(err.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        isLoading: false
    },
    extraReducers: (builder) => {
    builder
        .addCase(loginUser.fulfilled, (state,action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            
        })
        .addCase(loginUser.rejected, (state,action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        alert('Identifiants incorrects !');
        })
        .addCase(checkAuth.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(checkAuth.fulfilled, (state,action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
        })
        .addCase(checkAuth.rejected, (state,action) => {
            state.isAuthenticated = false;
            state.isLoading = false;
        })
        .addCase(logout.fulfilled, (state,action) => {
            state.isAuthenticated = false;
        });


}
});

export default authSlice.reducer;