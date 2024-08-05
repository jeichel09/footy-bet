import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PocketBase from 'pocketbase';

const url = 'https://footy-bet.pockethost.io/';
//const url = 'http://localhost:8090';
const pb = new PocketBase(url);
pb.autoCancellation(false);

const WithdrawalPage = () => {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigateTo = useNavigate();
    
    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = async () => {
        try {
            if (!pb.authStore.isValid) {
                throw new Error("User is not authenticated");
            }
            const userId = pb.authStore.model.id;
            const resultList = await pb.collection('transactions').getList(1, 50, {
                filter: `userID = "${userId}"`,
            });

            const calculatedBalance = resultList.items.reduce((acc, transaction) => {
                return transaction.ta_type === 'deposit'
                    ? acc + transaction.amount
                    : acc - transaction.amount;
            }, 0);

            setBalance(calculatedBalance);
        } catch (error) {
            console.error('Error fetching balance:', error);
            setError(error.message || "An unexpected error occurred");
        }
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        setError(null);
    };

const handleWithdraw = async () => {
    setIsLoading(true);
    setError(null);

    const withdrawalAmount = parseFloat(amount);

    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
        setError('Please enter a valid amount greater than 0!');
        setIsLoading(false);
        return;
    }

    if (withdrawalAmount > balance) {
        setError('Withdrawal amount cannot exceed your current balance!');
        setIsLoading(false);
        return;
    }

    try {
        if (!pb.authStore.isValid) {
            throw new Error('User is nor authenticated!');
        }

        const userID = pb.authStore.model.id;

        const transactionData = {
            userID: userID,
            ta_type: 'withdrawal',
            amount: withdrawalAmount,
        };

        await pb.collection('transactions').create(transactionData);

        alert(`Successfully withdrawn € ${withdrawalAmount}`);
        navigateTo("/wallet");
    } catch (error) {
        console.error('Error making withdrawal! : ', error);
        setError(error.message  || "An unexpected error occurred. Please try again.");
    } finally {
        setIsLoading(false);
    }
};

return(
    <div className="w-3/5 grids grid-rows-6 gap-3 wallet">
        <h2 className="text-2xl font-bold ml-20 mb-4">Make a Withdrawal</h2>
        <p className="mb-10 ml-20">Current Balance: €{balance.toFixed(2)}</p>
        {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        )}
        <div className="mb-4 ml-20 ">
            <label htmlFor="withdrawalAmount" className="block text-sm font-medium text-white text-gray-700">
            Withdrawal Amount (€0.01 - €{balance.toFixed(2)})
            </label>
            <input
                type="number"
                id="withdrawalAmount"
                value={amount}
                onChange={handleAmountChange}
                step="0.01"
                min="0.01"
                max={balance}
                className="mt-1 block w-1/4 text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter amount"
            />
        </div>
        <button
            onClick={handleWithdraw}
            disabled={isLoading || !amount}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-20 mt-5 rounded ${
                isLoading || !amount ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
        {isLoading ? 'Processing...' : 'Withdraw'}
        </button>
    </div>
);

};

export default WithdrawalPage;