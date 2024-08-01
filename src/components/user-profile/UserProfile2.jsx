import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import { getUserProfile, updateUserProfile, deleteUserAccount } from '../../services/profileServices';

const UserProfile = () => {
    const { username } = useContext(AuthContext);
    const [avatar, setAvatar] = useState(null);

    const [formData, setFormData] = useState({
        username: username,
        email: '',
        first_name: '',
        last_name: '',
        address: '',
        avatar: '',
    });
    const [originalData, setOriginalData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Fetch data from Pocketbase
        const fetchData = async () => {
        const record = await getUserProfile(username);
        setFormData(record);
        setOriginalData(record);
        };

        fetchData();
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
};

  const handleSave = async () => {
    await updateUserProfile(username, formData); // Replace with your collection and record ID
    setOriginalData(formData);
    setIsEditing(false);
    alert('Changes saved!');
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
    alert('Changes canceled!');
  };

  const handleEdit = () => {
    setIsEditing(true);
  }; 

  return (
    <div className="w-3/5 grids grid-rows-6 gap-3 profile-content">
        <h1 className="text-2xl font-bold ml-10 my-4">User Profile</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-2 flex">
            <form className="w-1/2 pr-4">
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
                        value={formData.email}
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
                        value={formData.first_name}
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
                        value={formData.last_name}
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
                        value={formData.address || ''}
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
                        onChange={handleAvatarChange}
                        disabled={!isEditing}
                    />
                </div>
                
                <div className="flex items-center justify-between">
                    {isEditing ? (
                        <>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button" onClick={handleSave}
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
                        </>
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

export default UserProfile;