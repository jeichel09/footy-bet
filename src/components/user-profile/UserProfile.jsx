import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import { getUserProfile, updateUserProfile, deleteUserAccount } from '../../services/profileServices';

const UserProfile = () => {
    const { id, username, isAuthenticated, logoutHandler } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log('UserProfile id:', id);
    const [profile, setProfile] = useState(null);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [avatar, setAvatar] = useState(null);

    /*useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userProfile = await getUserProfile(username);
                setProfile(userProfile);
                setEditedProfile(userProfile);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchProfile();
    }, [username]);*/

    /*const fetchProfile = useCallback(async () => {
        if (!isAuthenticated) {
            setError('User is not authenticated!');
            return;
        }
        
        try {
            const userProfile = await getUserProfile(username);
            setProfile(userProfile);
            setEditedProfile(userProfile);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError('Failed to load profile. Please try again later.');
        }
    }, [username, isAuthenticated]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);*/

    
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
            setAvatar(userProfile.avatar);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError('Failed to load profile. Please try again later.');
        }
    }, [username, isAuthenticated]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

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
        setAvatar(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting changes. Current states:', { email, firstName, lastName, address, avatar });
        try {
            const formData = new FormData();
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('address', address);
            
            // Only update email if it has changed
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
        console.log('Attempting to delete account for id:', id);
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await deleteUserAccount(id);
                logoutHandler();
                navigate('/');
            } catch (error) {
                console.error('Error deleting account:', error);
            }
        }
    };

    /*useEffect(() => {
        console.log('Component re-rendered. isEditing:', isEditing);
    });

    if (error) {
        return <div className="error-message">{error}</div>;
    }*/

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
                    <div  className="w-1/2 pl-4">
                        <div>
                            <h2 className="text-xl font-bold mb-2">Betting History</h2>
                            <div className="bg-gray-100 border rounded p-2 h-96 overflow-y-auto">
                                <p>No betting history available...yet</p>
                            </div>
                        </div>
                        <button
                                className="bg-red-500 hover:bg-red-700 mt-20 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleDeleteAccount}
                            >
                            Close Account
                        </button>
                    </div>
                </div>
        </div>
    )
}

export default UserProfile