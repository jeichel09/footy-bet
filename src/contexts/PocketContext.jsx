import {
    createContext,
    useContext,
    useCallback,
    useState,
    useEffect,
    useMemo,
  } from "react";
import PocketBase from "pocketbase";
import { useInterval } from "usehooks-ts";
import jwtDecode from "jwt-decode";
import ms from "ms";

const BASE_URL = "http://127.0.0.1:8090";
const fiveMinutesInMs = ms("5 minutes");
const twoMinutesInMs = ms("2 minutes");

const PocketContext = createContext({});

export const PocketProvider = ({ children }) => {
    const pb = useMemo(() => new PocketBase(BASE_URL), []);
  
    const [token, setToken] = useState(pb.authStore.token);
    const [user, setUser] = useState(pb.authStore.model);

    useEffect(() => {
      return pb.authStore.onChange((token, model) => {
        setToken(token);
        setUser(model);
      });
    }, []);

    const refreshSession = useCallback(async () => {
        if (!pb.authStore.isValid) return;
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const expirationWithBuffer = (decoded.exp + fiveMinutesInMs) / 1000;
        if (tokenExpiration < expirationWithBuffer) {
          await pb.collection("users").authRefresh();
        }
    }, [token]);
    
    useInterval(refreshSession, token ? twoMinutesInMs : null);
    
    const signup = useCallback(async (username, email, first_name, last_name, password) => {
        return await pb.collection("users").create({ username, email, first_name, last_name, password, ConfirmPassword: password });
        }, []);

    const login = useCallback(async (username, password) => {
        return await pb.collection("users").authWithPassword(username, password);
        }, []);

    const logout = useCallback(() => {
        pb.authStore.clear();
    }, []);
    
    return (
        <PocketContext.Provider value={{ token, user, pb, signup, login, logout }}>
            {children}
        </PocketContext.Provider>
    );
};

export const usePocket = () => useContext(PocketContext);

  