import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { fetchUnresolvedBets, updateBetStatus } from "../../services/adminServices";

const ResolveBets = () => {
    const { isAuthenticated, isAdmin } = useContext(AuthContext);
    const [bets, setBets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isAuthenticated && isAdmin) {
            loadUnresolvedBets();
        }
    }, [isAuthenticated, isAdmin]);

    const loadUnresolvedBets = async () => {
        try {
            setLoading(true);
            const unresolvedBets = await fetchUnresolvedBets();
            setBets(unresolvedBets.items);
        } catch (error) {
            setError('Failed to load unresolved bets');
        } finally {
            setLoading(false);
        }
    };
    
    const handleResolve = async (betId, status) => {
        try {
            await updateBetStatus(betId, status);
            loadUnresolvedBets();
        } catch (error) {
            setError('Failed to resolve bets');
        }
    };

    useEffect(() => {
        console.log('ResolveBets: Component mounted');
        console.log('ResolveBets: isAuthenticated =', isAuthenticated, 'isAdmin =', isAdmin);
    }, []);

    if (!isAuthenticated || !isAdmin) {
        console.log('ResolveBets: Access denied');
        return <Navigate to='/login' replace />;
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="resolve w-full mx-1">
            <h1 className="text-2xl font-bold text-center my-10">Resolve Bets</h1>
            <section className="bg-white w-3/6 items-center shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto flex">
            {bets.map(bet => (
                <div key={bet.id} className="mb-4 p-4 border rounded">
                    <h2 className="text-xl">{bet.home_team} vs {bet.away_team}</h2>
                    <p>Commence Time: {new Date(bet.commence_time).toLocaleString()}</p>
                    <p>User: {bet.expand?.userID?.username}</p>
                    <p>Bet: {bet.bet_choice} @ {bet.bet_quote}</p>
                    <p>Amount: ${bet.bet_amount}</p>
                    <div className="mt-2">
                        <select 
                            onChange={(e) => handleResolve(bet.id, e.target.value)}
                            className="bg-white border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="">Select outcome</option>
                            <option value="won">Won</option>
                            <option value="lost">Lost</option>
                            <option value="moneyback">Money Back</option>
                            <option value="halfback-halflost">Half Back - Half Lost</option>
                            <option value="halfback-halfwon">Half Back - Half Won</option>
                        </select>
                    </div>
                </div>
            ))}
            </section>
        </div>
    );
};

export default ResolveBets;