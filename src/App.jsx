import { Routes, Route } from "react-router-dom";

import { AuthProvider } from './contexts/authContext';


import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Logout from "./pages/logout/Logout";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <>
          <Navbar />
          
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/signup'} element={<SignUp />} />
            <Route path={'/logout'} element={<Logout />} />
          </Routes>
        </>
      </AuthProvider>
    </ErrorBoundary>
    
      
  )
}

export default App
