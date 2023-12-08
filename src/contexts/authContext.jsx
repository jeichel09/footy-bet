import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import * as auth from '../lib/pocketbase';
import usePersistedState from "../hooks/usePersistedState";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigateTo = useNavigate();
    const [isAuth, setIsAuth] = usePersistedState('isAuth', {});
    
    const loginSubmitHandler = async (values) => {
        const res = await auth.login(values.username, values.password);
        
        setIsAuth(res);
        //console.log(isAuth.record.username);
        navigateTo('/');
    };
    
      const signupSubmitHandler = async (values) => {
        const res = await auth.signup(values.username, values.email, values.first_name, values.last_name, values.password, values.passwordConfirm);
        
        setIsAuth(res);
        navigateTo('/');
      };
    
      const logoutHandler = () => {
        setIsAuth({});
        localStorage.removeItem('token');
        navigateTo('/');
      };

      function isEmpty(isAuth) {
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
      }
      

      return (
            <AuthContext.Provider value={values}>
              {children}
            </AuthContext.Provider>
      );
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;