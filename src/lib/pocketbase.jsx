import PocketBase, { ClientResponseError } from 'pocketbase';
//import { useNavigate } from "react-router-dom";

//import Path from '../paths'; 


//const url = `${import.meta.env.VITE_POCKETBASE}`;
const url = 'https://footy-bet.pockethost.io/';
//const url = 'http://localhost:8090';
const pb = new PocketBase(url);
pb.autoCancellation(false);

export const isUserValid = pb.authStore.isValid;
//const navigate = useNavigate();

export function errorMessage(error) {
    const errorObj = error;
    console.error(errorObj.message);
    return errorObj.message;
}

export async function login(username, password) {
    const res = await pb.collection("users").authWithPassword(username, password);

    return res;
}

export async function signup(username, email, first_name, last_name, password, passwordConfirm) {
    try {
        const data = {
            username: username,
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: password,
            passwordConfirm: passwordConfirm
        };
        
        const res = await pb.collection("users").create(data);
        const authData = await pb.collection("users").authWithPassword(username, password);

        return {res, authData};
    } catch (error) {
        
    }
    

    
} 
export async function logout() {
    pb.authStore.clear();
    //window.location.reload();
}


