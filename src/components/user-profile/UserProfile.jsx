import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import { getUserProfile, updateUserProfile, checkForBalance, checkForOpenBets, getBettingHistory, deleteUserAccount } from '../../services/profileServices';

const UserProfile = () => {
    const { id, username, isAuthenticated, logoutHandler } = useContext(AuthContext);
    const navigateTo = useNavigate();
    console.log('UserProfile id:', id);
    const [profile, setProfile] = useState(null);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const [bettingHistory, setBettingHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    const fetchProfile = useCallback(async () => {
        if (!isAuthenticated) {
            setError('User is not authenticated!');
            return;
        }
        
        try {
            console.log('Fetching profile...');
            const userProfile = await getUserProfile(username);
            console.log('Fetched profile:', userProfile);
            setProfile(userProfile);
            setEmail(userProfile.email);
            setFirstName(userProfile.first_name);
            setLastName(userProfile.last_name);
            setAddress(userProfile.address);
            setPhone(userProfile.phone);
            setAvatar(userProfile.avatar);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError('Failed to load profile. Please try again later.');
        }
    }, [username, isAuthenticated]);

    useEffect(() => {
        fetchProfile();
        fetchBettingHistory();
    }, [fetchProfile]);

    const fetchBettingHistory = async () => {
        if (!isAuthenticated) return;
        setLoadingHistory(true);
        try {
            const history = await getBettingHistory(id);
            setBettingHistory(history);
        } catch (error) {
            console.error('Error fetching betting history:', error);
        } finally { 
            setLoadingHistory(false);
        }
    };

    const handleEdit = () => {
        console.log('Editing started. Current isEditing state:', isEditing);
        setIsEditing(true);
        setError(null);
    };

    const handleCancel = () => {
        console.log('Editing cancelled');
        setIsEditing(false);
        setError(null);
        setEmail(profile.email);
        setFirstName(profile.first_name);
        setLastName(profile.last_name);
        setAddress(profile.address);
        setPhone(profile.phone);
        setAvatar(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting changes. Current states:', { email, firstName, lastName, address, phone, avatar });
        try {
            const formData = new FormData();
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('address', address);
            formData.append('phone', phone);
            
            if (email !== profile.email) {
                formData.append('email', email);
            }

            if (avatar) {
                formData.append('avatar', avatar);
            }

            const updatedProfile = await updateUserProfile(username, formData);
            console.log('Profile updated:', updatedProfile);
            setProfile(updatedProfile);
            setIsEditing(false);
            setError(null);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.message || 'Failed to update profile. Please try again.');
        }
    };

    /*const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Field '${name}' changed to:`, value);
        setProfile(prev => { 
            const updatedProfile = { ...prev, [name]: value};
            console.log('Updated profile state:', updatedProfile);
            return updatedProfile;
         });
        
    };*/
    
    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    };

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        setDeleteError(null);
        

        console.log('Attempting to delete account for id:', id);

        try {
            const hasOpenBets = await checkForOpenBets(id);
            if (hasOpenBets) {
                setDeleteError('You cannot delete your account because you have open bets. Please wait for all bets to be settled.');
                return;
            }

            const hasBalance = await checkForBalance(id);
            if (hasBalance) {
                setDeleteError('You still have a balance in your account. Please withdraw all funds before closing your account.');
                return;
        }
            if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                await deleteUserAccount(id);
                logoutHandler();
                navigateTo('/');
            }        
        } catch (error) {
            console.error('Error checking account status or deleting account:', error);
            setDeleteError('An error occurred while trying to delete your account. Please try again later.');
        } finally {
            setIsDeleting(false);
        }
    }


    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        
        <div className="w-3/5 grids grid-rows-6 gap-3 profile-content">
            <h1 className="text-2xl font-bold ml-10 my-4">User Profile</h1>
            {error && <div className="error-message text-red-500">{error}</div>}
            
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-2 flex">
                    <form onSubmit={handleSubmit} className="w-1/2 pr-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                name="username"
                                value={username} 
                                disabled
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                    console.log('Email changed:', e.target.value);
                                    setEmail(e.target.value);
                                }}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="firstName"
                                type="text"
                                name="first_name"
                                value={firstName}
                                onChange={(e) => {
                                    console.log('First Name changed:', e.target.value);
                                    setFirstName(e.target.value);
                                }}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="lastName"
                                type="text"
                                name="last_name"
                                value={lastName}
                                onChange={(e) => {
                                    console.log('Last Name changed:', e.target.value);
                                    setLastName(e.target.value);
                                }}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                Address
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="address"
                                type="text"
                                name="address"
                                value={address || ''}
                                onChange={(e) => {
                                    console.log('Address changed:', e.target.value);
                                    setAddress(e.target.value);
                                }}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="phone"
                                type="text"
                                name="phone"
                                value={phone || ''}
                                onChange={(e) => {
                                    console.log('Phone changed:', e.target.value);
                                    setPhone(e.target.value);
                                }}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
                                Avatar
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="avatar"
                                type="file" 
                                name="avatar" 
                                accept="image/*"
                                onChange={handleAvatarChange}
                                disabled={!isEditing}
                            />
                        </div>
                        {!isEditing && (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleEdit}
                            >
                                Edit Profile
                            </button>
                        )}
                        {isEditing && (
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Save Changes
                            </button>
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                        )}	
                    </form>
                    <div  className="w-1/2 pl-4 flex flex-col">
                        <div className='flex-grow'>
                            <h2 className="text-xl font-bold mb-2">Betting History</h2>
                            <div className="bg-gray-100 border rounded p-2 h-96 overflow-y-auto">
                                {loadingHistory ? (
                                    <p>Loading betting history...</p>
                                ) : bettingHistory.length > 0 ? (
                                    bettingHistory.map((bet, index) => (
                                        <div key={index} className="mb-4 p-2 bg-white rounded shadow">
                                            <p className="font-semibold">{bet.home_team} vs {bet.away_team}</p>
                                            <p>Bet: {bet.bet_choice} @ {bet.bet_quote}</p>
                                            <p>Amount: €{bet.bet_amount}</p>
                                            <p>Status: <span className={`font-bold ${bet.status === 'won' ? 'text-green-600' : bet.status === 'lost' ? 'text-red-600' : 'text-yellow-600'}`}>{bet.status}</span></p>
                                            {bet.status === 'won' && <p className="text-green-600">Won: €{(bet.bet_amount * bet.bet_quote).toFixed(2)}</p>}
                                            <p className="text-sm text-gray-500">Placed on: {new Date(bet.created).toLocaleString()}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No betting history available...yet</p>
                                )}
                                
                            </div>
                        </div>
                        <button
                                className={`bg-red-500 hover:bg-red-700 mt-40 text-white font-bold py-2 px-4 
                                rounded focus:outline-none focus:shadow-outline ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                type="button"
                                onClick={handleDeleteAccount} disabled={isDeleting}
                            >
                            {isDeleting ? 'Processing...' : 'Close Account'}
                        </button>
                        {deleteError && (
                            <p className="text-red-500 mt-2">{deleteError}</p>
                        )}
                    </div>
                </div>
        </div>
    );
};
export default UserProfile