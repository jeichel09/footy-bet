import { useContext } from "react";

import * as auth from '../../lib/pocketbase';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

export default function Logout() {
    const navigateTo = useNavigate();
    const { logoutHandler } = useContext(AuthContext);

    try {
        auth.logout()
        logoutHandler();
    } catch (error) {
        errorMessage(error);
    }

    
    return null;
}