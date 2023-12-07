import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import * as auth from '../lib/pocketbase';
import usePersistedState from '../hooks/usePersistedState';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigateTo = useNavigate();
    const [isAuth, setIsAuth] = usePersistedState('isAuth', {});

    const loginSubmitHandler = async (values) => {
        const res = await auth.login(values.username, values.password);
        
        setIsAuth(res);
        navigateTo('/');
    };
    
      const signupSubmitHandler = async (values) => {
        const res = await auth.signup(values.username, values.email, values.first_name, values.last_name, values.password, values.passwordConfirm);
        
        setIsAuth(res);
        navigateTo('/');
      };
    
      const logoutHandler = () => {
        setIsAuth({});
        //localStorage.removeItem('token');
      };
    
      const values = {
        loginSubmitHandler,
        signupSubmitHandler,
        logoutHandler,
        username: isAuth.record.username || null,
        email: isAuth.record.email,
        first_name: isAuth.record.first_name,
        last_name: isAuth.record.last_name,
        isAuthenticated: !!isAuth.record.username,
      };

      return (
            <AuthContext.Provider value={values}>
                {children}
            </AuthContext.Provider>
      );
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;