import { useContext, useEffect } from "react";

import * as auth from '../../lib/pocketbase';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

export default function Logout() {
    const navigateTo = useNavigate();
    const { logoutHandler } = useContext(AuthContext);

    useEffect(() => {
        auth.logout()
            .then(() => {
                logoutHandler();
                navigateTo('/');
            })
            .catch(() => {
                logoutHandler();
                navigateTo('/')
            });
    }, []);

    return null;
}