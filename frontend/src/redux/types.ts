export type Caserne = {
    name: string;
    groupement: string;
    latitude: number;
    longitude: number;
    maxEffectif: number;
    vehicules: Vehicule[];
    users: User[];
}

export type Vehicule = {
    type: string;
    statut: string;
    latitude: number;
    longitude: number;
    caserneId: number;
}


export type User ={
    username: string;
    email: string;
    password: string;
    caserneId: number;
    grade: string;
    status: string;
    caserne: Caserne;
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

export enum GradeImage {
    Matelot = "/assets/MO1.jpg"
}

export function getImage(grade:string): string | undefined {
return GradeImage[grade as keyof typeof GradeImage];
}