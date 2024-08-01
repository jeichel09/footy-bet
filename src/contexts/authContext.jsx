import { createContext, useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import * as auth from '../lib/pocketbase';
import usePersistedState from "../hooks/usePersistedState";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigateTo = useNavigate();
    const [isAuth, setIsAuth] = usePersistedState('isAuth', {});
    
    const loginSubmitHandler = useCallback(async (values) => {
        try {
          const res = await auth.login(values.username, values.password);
          setIsAuth(res);
          navigateTo('/');
        } catch (error) {
          console.error(auth.errorMessage(error));
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

      const contextValue = useMemo(() => ({
        loginSubmitHandler,
        signupSubmitHandler,
        logoutHandler,
        id: isAuth.record?.id,
        username: isAuth.record?.username,
        email: isAuth.record?.email,
        first_name: isAuth.record?.first_name,
        last_name: isAuth.record?.last_name,
        isAuthenticated: !!isAuth.record?.username,
    }), [isAuth, loginSubmitHandler, signupSubmitHandler, logoutHandler]);

      /*function isEmpty(isAuth) {
        for(var prop in isAuth) {
            if(isAuth.hasOwnProperty(prop))
                return false;
        }
    
        return true;
      }

      let values = {};

      if (isEmpty(isAuth)) {
        values = {
          loginSubmitHandler,
          signupSubmitHandler,
          logoutHandler,
          username: isAuth.username,
          email: isAuth.email,
          first_name: isAuth.first_name,
          last_name: isAuth.last_name,
          isAuthenticated: !!isAuth.username,
        };
      } else {
        values = {
          loginSubmitHandler,
          signupSubmitHandler,
          logoutHandler,
          username: isAuth.record.username,
          email: isAuth.record.email,
          first_name: isAuth.record.first_name,
          last_name: isAuth.record.last_name,
          isAuthenticated: !!isAuth.record.username,
        };
      }*/
      
      /*const values = {
        loginSubmitHandler,
        signupSubmitHandler,
        logoutHandler,
        username: isAuth.username,
        email: isAuth.email,
        first_name: isAuth.first_name,
        last_name: isAuth.last_name,
        isAuthenticated: !!isAuth.username,
      };*/

      return (
            <AuthContext.Provider value={contextValue}>
              {children}
            </AuthContext.Provider>
      );
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;