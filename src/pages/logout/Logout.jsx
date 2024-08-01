import { useContext, useEffect } from "react";

import * as auth from '../../lib/pocketbase';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

/*export default function Logout() {
    const navigateTo = useNavigate();
    const { logoutHandler } = useContext(AuthContext);

    try {
        auth.logout()
        logoutHandler();
    } catch (error) {
        errorMessage(error);
    }

    
    return null;
}*/

const Logout = () => {
    const { logoutHandler } = useContext(AuthContext);
    const navigateTo = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            await logoutHandler();
            navigateTo('/', { replace: true });
        };
        performLogout();
    }, [logoutHandler, navigateTo]);

    return <div>Logging out...</div>;
};

export default Logout;
