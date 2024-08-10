import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import PocketBase from 'pocketbase';

const url = 'https://footy-bet.pockethost.io/';
//const url = 'http://localhost:8090';
const pb = new PocketBase(url);
pb.autoCancellation(false);


const WalletPage = () => {
    const [balance, setBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
        
    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (!pb.authStore.isValid) {
                throw new Error("User is not authenticated!");
            }
            const userID = pb.authStore.model.id;
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
            if (error.status === 403) {
                setError("Permission denied. Please contact support if this persists.");
            } else {
                setError(error.message || "An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);    
        }
    };

    /*const handleTransaction = async (transactionType) => {
        if (!amount || isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        try {
            await pb.collection('transactions').create({
            userID: pb.authStore.model.id,
            ta_type: transactionType,
            amount: parseFloat(amount),
            });

            await fetchBalance();
            setAction(null);
            setAmount('');
        } catch (error) {
            console.error(`Error ${transactionType}ing:`, error);
        }
    };*/

    return (
    <div className="w-3/5 grids grid-rows-6 gap-3 wallet">
        <h1 className="text-2xl font-bold ml-10 my-4">Wallet</h1>
        <div className="bg-white shadow rounded-lg p-6 mx-2">
        {isLoading ? (
            <p className="text-gray-600">Loading balance...</p>
        ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        ) : (
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
                <p className="font-bold">Current Balance</p>
                <p>€ {balance.toFixed(2)}</p>
            </div>
        )}    
        
            <div className="flex space-x-4 mb-4">
                <Link to="/wallet/deposit" >
                    <button
                       className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        >
                    Deposit
                    </button>
                </Link>
                <Link to="/wallet/withdrawal" >
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        disabled={balance <= 0}
                        >
                    Withdraw
                    </button>
                </Link> 
            </div>
                    
            {/*</div>
            action && (
                <div className="mt-4">
                <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={`Amount to ${action}`}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                />
                <button
                    onClick={() => handleTransaction(action)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                >
                    Confirm {action}
                </button>
                </div>
            )*/}
            </div>
    </div>
    );
};

export default WalletPage;