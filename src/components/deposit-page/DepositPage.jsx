import { useState } from "react";
import getBanknotesPath from "../../utils/getBanknotesPath";
import PocketBase from 'pocketbase';

const url = 'https://footy-bet.pockethost.io/';
//const url = 'http://localhost:8090';
const pb = new PocketBase(url);
pb.autoCancellation(false);

const DepositPage = ({ onDepositComplete}) => {
    const [sessionDeposit, setSessionDeposit] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); 

    const euroNotes = [5, 10, 20, 50, 100, 200];

    const handleNoteClick = (amount) => {
        setSessionDeposit(prevAmount => prevAmount + amount);
    };

    const handleDeposit = async () => {
        if (sessionDeposit > 0) {
            setIsLoading(true);
            setError(null);
            try {
                if (!pb.authStore.isValid) {
                    throw new Error("User is not authenticated");
                }

                const userData = await pb.collection('users').getOne(pb.authStore.model.id);

                await pb.collection('transactions').create({
                    userID: userData.id,
                    ta_type: 'deposit',
                    amount: sessionDeposit
                });

                console.log('User data:', userData);
                console.log('Creating transaction with:', {
                    userID: userData.id,
                    ta_type: 'deposit',
                    amount: sessionDeposit,
                });

                alert(`Successfully deposited € ${sessionDeposit}!`);
                setSessionDeposit(0);
                if (onDepositComplete) onDepositComplete();
            } catch (error) {
                console.error('Error making deposit', error );
                if (error.status === 403) {
                    setError("Permission denied. Please ensure you're logged in and try again.");
                } else {
                    setError(error.message || "An unexpected error occurred. Please try again.");
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            setError('Please select an amount to deposit');
        }
    };

    return (
        <div className="w-3/5 grids grid-rows-6 gap-3 wallet">
            <h2 className="text-2xl font-bold ml-10 mb-4">Make a Deposit</h2>
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            )}
            <div className="grid grid-cols-3 gap-4 mb-4 mx-5">
                {euroNotes.map(note => (
                <button
                    key={note}
                    onClick={() => handleNoteClick(note)}
                    className="p-2 border rounded hover:bg-gray-100 transition-colors"
                    disabled={isLoading}
                >
                    <img 
                    src={getBanknotesPath(note)} 
                    alt={`€${note} note`} 
                    className="w-full h-auto"
                    />
                </button>
                ))}
            </div>
            <div className="mb-4">
                <p className="text-xl ml-10 font-semibold">Amount to deposit: €{sessionDeposit}</p>
            </div>
            <button
                onClick={handleDeposit}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 ml-10 rounded"
                disabled={isLoading}
            >
                {isLoading ? 'Processing...' : `Deposit € ${sessionDeposit}`}
            </button>
        </div>
    );
};

export default DepositPage;