import { createSlice, createAsyncThunk, isRejected} from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import {User, Login} from '../types.js';
import 'react-toastify/dist/ReactToastify.css';



export const loginUser = createAsyncThunk<User, Login,{rejectValue: string}>(
    'auth/loginUser',
    async ({username, password}:Login,{rejectWithValue}) => {
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
            return data.user as User;
        } catch (err:any) {
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
        } catch(err:any) {
            return rejectWithValue(err.message);
        }
    });


export const logout = createAsyncThunk<boolean, void>(
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
        } catch(err:any) {
            return rejectWithValue(err.message);
        }
    }
);

export const checkUsername = createAsyncThunk<boolean,{username:string}>(
    'auth/checkUsername',
    async (payload, { rejectWithValue }) => {
        try {
            const apiURL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiURL}/auth/checkUsername/${payload.username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de la vérification');
            }

            const data = await response.json();
            return data.available;
        } catch (err:any) {
            return rejectWithValue(err.message);
        }
    }
);

export const register = createAsyncThunk<boolean,{username:string,password:string,email:string,dateNaissance:string,tokenCaptcha:string | null}>(
    'auth/regiter',
    async({username, password,email,dateNaissance,tokenCaptcha}, {rejectWithValue}) => {
        try {
          const apiURL = import.meta.env.VITE_API_URL;
          const response = await fetch(`${apiURL}/auth/register`, {
             method: 'POST',
             headers: {
                'Content-Type': 'application/json'
             },
             credentials: 'include',
             body: JSON.stringify({username, password,email,dateNaissance,tokenCaptcha})
          });

          if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message ||'Erreur du serveur');
          }

          const data = await response.json();
          return data;

        } catch(err:any) {
          return rejectWithValue(err.message);
        }
    }
)



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        isLoading: false,
        isUsernameAvailable: false,
        isRegister: false,
        isDone: false,
    },
    reducers: {
       resetRegister: (state) => {
        state.isRegister = false;
       },
       resetIsDone: (state) => {
        state.isDone = false;
       }
    },
    extraReducers: (builder) => {
    builder
        .addCase(loginUser.fulfilled, (state,action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
        })
        .addCase(loginUser.rejected, (state,action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isAuthenticated = false;
        toast.error('Identifiants incorrects !');
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
            
        })
        .addCase(checkUsername.pending, (state) => {
            state.isLoading = true;
            state.isDone = false;
            state.isUsernameAvailable = false;
        })
        .addCase(checkUsername.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.isUsernameAvailable = action.payload;
        })
        .addCase(checkUsername.rejected, (state, action) => {
            state.isLoading = false;
            state.isUsernameAvailable = false;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isRegister = true;
            state.isAuthenticated = true;
        })
        .addCase(register.rejected, (state, action) => {
            toast.error(`${action.payload}`);
        })


}
});
export const {resetRegister,resetIsDone} = authSlice.actions;
export default authSlice.reducer;