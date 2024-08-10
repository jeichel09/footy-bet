import { createContext, useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import * as auth from '../lib/pocketbase';
import usePersistedState from "../hooks/usePersistedState";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigateTo = useNavigate();
    const [isAuth, setIsAuth] = usePersistedState('isAuth', {});
    const [authError, setAuthError] = useState(null);
    
    const loginSubmitHandler = useCallback(async (values) => {
        try {
          const res = await auth.login(values.username, values.password);
          setIsAuth(res);
          setAuthError(null);
          if (res.record.role === 'admin') {
            navigateTo('/resolve-bets');
          } else {
            navigateTo('/');
          }
        } catch (error) {
          console.error(auth.errorMessage(error));
          setAuthError("Invalid username or password. Please try again.");
        }
    }, [navigateTo, setIsAuth]);
    
      const signupSubmitHandler = useCallback(async (values) => {
        try {
          const res = await auth.signup(values.username, values.email, values.first_name, values.last_name, values.password, values.passwordConfirm);
          setIsAuth(res);
          localStorage.setItem('token', res.token);
          navigateTo('/login');
        } catch (error) {
          console.error(auth.errorMessage(error));
        }
      }, [navigateTo, setIsAuth]);
    
      const logoutHandler = useCallback(() => {
        auth.logout();
        setIsAuth({});
        localStorage.removeItem('token');
        navigateTo('/', { replace: true });
      }, [navigateTo, setIsAuth]);

      const clearAuthError = useCallback(() => {
        setAuthError(null);
      }, []);

      const contextValue = useMemo(() => ({
        loginSubmitHandler,
        signupSubmitHandler,
        logoutHandler,
        clearAuthError,
        authError,
        id: isAuth.record?.id,
        username: isAuth.record?.username,
        email: isAuth.record?.email,
        first_name: isAuth.record?.first_name,
        last_name: isAuth.record?.last_name,
        isAuthenticated: !!isAuth.record?.username,
        isAdmin: isAuth.record?.role == 'admin',
    }), [isAuth, loginSubmitHandler, signupSubmitHandler, logoutHandler, clearAuthError, authError]);

      return (
            <AuthContext.Provider value={contextValue}>
              {children}
            </AuthContext.Provider>
      );
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;