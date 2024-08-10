import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import Sidebar from '../../components/sidebar/Sidebar';
import Betslip from '../../components/betslip/Betslip';

const MainLayout = ({ children }) => {
    const { isAuthenticated, isAdmin } = useContext(AuthContext);
    const location = useLocation();

    const isAdminRoute = location.pathname === '/resolve-bets';

    if (isAuthenticated && isAdmin) {
        return (
            <div className="flex">
                <div className="w-full">{children}</div>
            </div>
        );
    }

    return (
        <div className="flex">
            {!isAdminRoute && <Sidebar className="w-1/5" />}
            <div className="w-3/5">{children}</div>
            {!isAdminRoute && <Betslip className="w-1/5" />}
        </div>
    );
};

export default MainLayout;