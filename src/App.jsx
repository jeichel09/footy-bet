import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';
import AuthContext from './contexts/authContext';

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Logout from "./pages/logout/Logout";
import Resolve from './pages/resolve/Resolve';
import Wallet from "./pages/wallet/Wallet";
import Deposit from "./pages/deposit/Deposit";
import Withdrawal from './pages/withdrawal/Withdrawal';
import Profile from "./pages/profile/Profile";
import Epl from './pages/leagues/epl';
import LaLiga from './pages/leagues/laliga';
import Dbl from './pages/leagues/dbl';
import SerieA from './pages/leagues/seriea';
import Ligue1 from './pages/leagues/ligue1';
import Event from './pages/event/Event';
import ErrorBoundary from "./components/ErrorBoundary";

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};

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
            <Route path={'/resolve-bets'} element={
              <ProtectedAdminRoute>
                <Resolve />
              </ProtectedAdminRoute>
            } />
            <Route path={'/wallet'} element={<Wallet />} />
            <Route path={'/wallet/deposit'} element={<Deposit />} />
            <Route path={'/wallet/withdrawal'} element={<Withdrawal />} />
            <Route path={'/profile'} element={<Profile />} />
            <Route path={'/leagues/epl'} element={<Epl />} />
            <Route path={'/leagues/laliga'} element={<LaLiga />} />
            <Route path={'/leagues/dbl'} element={<Dbl />} />
            <Route path={'/leagues/seriea'} element={<SerieA />} />
            <Route path={'/leagues/ligue1'} element={<Ligue1 />} />
            <Route path={'/games/:league/:gameId'} element={<Event />} />
          </Routes>
        </>
      </AuthProvider>
    </ErrorBoundary>  
  )
}

export default App
