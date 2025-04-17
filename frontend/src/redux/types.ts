export type User ={
    username: string;
    email: string;
    password: string;
    caserneName: string;
    grade: string;
    status: string;
}

export type Login = {
    username: string;
    password: string;
}

export type AuthState = {
    isAuthenticated: boolean;
        isLoading: boolean;
        isUsernameAvailable: boolean;
        isRegister: boolean;
}