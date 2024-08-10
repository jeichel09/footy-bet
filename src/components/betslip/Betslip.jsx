import { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/authContext";
import PocketBase from 'pocketbase';

const url = 'https://footy-bet.pockethost.io/';
//const url = 'http://localhost:8090';
const pb = new PocketBase(url);
pb.autoCancellation(false);

const Betslip = ({ selectedBet, onBetConfirm }) => {
    const [openTab, setOpenTab] = useState(1);
    const [balance, setBalance] = useState(0);
    const [wagerAmount, setWagerAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openBets, setOpenBets] = useState([]);

    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            fetchBalance();
            fetchOpenBets();
        }
    }, [isAuthenticated]);

    const fetchBalance = async () => {
        /*if (!pb.authStore.isValid) {
            console.log("User is not authenticated");
            return;
        }*/

        try {    
            const userID = pb.authStore.model.id;
            if (!userID) {
                throw new Error("User ID is not available");
            }
            const resultList = await pb.collection('transactions').getList(1, 50, {
                filter: `userID = "${userID}"`,
            });

            const calculatedBalance = resultList.items.reduce((acc, transaction) => {
                return transaction.ta_type === 'deposit' || transaction.ta_type === 'gain'
                    ? acc + transaction.amount
                    : acc - transaction.amount;
            }, 0);

            setBalance(calculatedBalance);
        } catch (error) {
            console.error('Error fetching balance:', error);
            setError(error.message || "An unexpected error occurred");
        }
    };

    const fetchOpenBets = async () => {
        /*if (!pb.authStore.isValid) {
            console.log("User is not authenticated");
            return;
        }*/
        try {
            const userID = pb.authStore.model.id;
            if (!userID) {
                throw new Error("User ID is not available");
            }
            const openBetsList = await pb.collection('bets').getList(1, 50, {
                filter: `userID = "${userID}" && status = 'open'`,
            });

            setOpenBets(openBetsList.items);
        } catch (error) {
            console.error('Error fetching bets:', error);
            setError("Failed to fetch open bets. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleWagerChange = (e) => {
        setWagerAmount(e.target.value);
    };

    const placeBet = async () => {
        if (!isAuthenticated) {
            setError("You must be logged in to place a bet.");
            return;
        }        
        
        setIsLoading(true);
        setError(null);
        try {
            const userId = pb.authStore.model.id;

            if (!selectedBet || !selectedBet.gameId || !selectedBet.league || !selectedBet.home_team || 
                !selectedBet.away_team || !selectedBet.commence_time || !selectedBet.bet_choice || 
                !selectedBet.quote || !wagerAmount) {
                throw new Error("Missing required bet information");
            }

            const betData = {
                userID: userId,
                gameID: selectedBet.gameId,
                league: selectedBet.league,
                home_team: selectedBet.home_team,
                away_team: selectedBet.away_team,
                commence_time: new Date(selectedBet.commence_time).toISOString(),
                bet_choice: selectedBet.bet_choice,
                bet_quote: parseFloat(selectedBet.quote),
                bet_amount: parseFloat(wagerAmount),
                potential_return: parseFloat((parseFloat(wagerAmount) * parseFloat(selectedBet.quote)).toFixed(2)),
                status: 'open'
            };

            console.log("Attempting to create bet with data:", betData);

            const createdBet = await pb.collection('bets').create(betData);

            console.log("Bet created successfully:", createdBet);

            await pb.collection('transactions').create({
                userID: userId,
                ta_type: 'bet',
                amount: parseFloat(wagerAmount)
            });

            alert('Bet placed successfully!');
            onBetConfirm();
            setWagerAmount('');
            fetchBalance();
            fetchOpenBets();
            setOpenTab(2);
        } catch (error) {
            console.error('Error placing bet:', error);
            if (error.data) {
                console.error('Detailed error data:', error.data);
            }
            setError(error.message || "An unexpected error occurred while placing the bet.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="betslip w-1/5 ml-1 mr-0">
                <p className="ml-5 mt-5">Please log in to view and place bets.</p>
            </div>
        );
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return(
        <div className="betslip w-1/5 ml-1 mr-0">
            <div className="betslip-ui mx-4 mt-4">
                <ul className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0" role="tablist">
                    <li role="presentation" className="flex-auto text-center">
                        <a
                            href="#" onClick={() => setOpenTab(1)}
                            className={`${openTab === 1 ? "bg-[#ECEFEA] text-gray-600" : "bg-grey-400 text-white"} w-full inline-block px-4 py-4`}
                        >
                            Betslip
                        </a>
                    </li>
                    <li role="presentation" className="flex-auto text-center">
                        <a
                            href="#" onClick={() => setOpenTab(2)}
                            className={`${openTab === 2 ? "bg-[#ECEFEA] text-gray-600" : "bg-grey-400 text-white"} w-full inline-block px-4 py-4`}
                        >
                            Open bets
                        </a>
                    </li>
                </ul>

                <div className="p-3 mt-6 bg-white border">
                    {error && <p className="text-red-500 mb-2">{error}</p>} 
                    {openTab === 1 && (
                        <div>
                            {selectedBet ? (
                                <div className="current-bet">
                                    <h3 className="text-lg font-bold">{selectedBet.home_team} vs {selectedBet.away_team}</h3>
                                    <p>Bet: {selectedBet.bet_choice} @ {selectedBet.quote}</p>
                                    <input
                                        type="number"
                                        value={wagerAmount}
                                        onChange={handleWagerChange}
                                        placeholder="Enter wager amount"
                                        className="mt-2 p-1 border rounded w-full"
                                    />
                                    <p className="mt-1">Potential return: €{(parseFloat(wagerAmount || 0) * selectedBet.quote).toFixed(2)}</p>
                                    <button
                                        onClick={placeBet}
                                        disabled={!wagerAmount || isLoading || parseFloat(wagerAmount) > balance}
                                        className="mt-2 bg-green-500 text-white p-2 rounded disabled:bg-gray-300"
                                    >
                                        Place Bet
                                    </button>
                                </div>
                            ) : (
                                <p>No bet selected</p>
                            )}
                            <p className="mt-4">Available balance: €{balance.toFixed(2)}</p>
                        </div>
                    )}
                    {openTab === 2 && (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Open Bets</h3>
                            {openBets.length > 0 ? (
                                openBets.map((bet, index) => (
                                    <div key={index} className="mb-2 p-2 border rounded">
                                        <p>{bet.home_team} vs {bet.away_team}</p>
                                        <p>Bet: {bet.bet_choice} @ {bet.bet_quote}</p>
                                        <p>Amount: €{bet.bet_amount}</p>
                                        <p>Potential return: €{bet.potential_return.toFixed(2)}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No open bets at the moment.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Betslip;