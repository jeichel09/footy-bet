import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import { getUserProfile, updateUserProfile } from '../../services/profileServices';


const UserProfile = () => {
    const { username } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        address: '',
        avatar: '',
    });
    

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userProfile = await getUserProfile(username);
                setProfile(userProfile);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchProfile();
    }, [username]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.target));
        console.log(values);
       
        try {
            const updatedProfile = await updateUserProfile(username, values);
            setProfile(updatedProfile);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-3/5 grids grid-rows-6 gap-3 profile-content">
            <h1 className="text-2xl font-bold ml-10 my-4">User Profile</h1>
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
                            value={profile.email}
                            onChange={handleChange}
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
                            value={profile.first_name}
                            onChange={handleChange}
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
                            value={profile.last_name}
                            onChange={handleChange}
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
                            value={profile.address || ''}
                            onChange={handleChange}
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
                            accept="image/*"
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        {isEditing ? (
                            
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Save Changes
                                </button>
                                
                            
                        ) : (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleEdit}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
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
                            
                        >
                        Close Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserProfile