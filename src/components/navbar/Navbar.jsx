import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { getUserProfile } from "../../services/profileServices";

export default function Navbar() {
    const {
        isAuthenticated,
        username,
    } = useContext(AuthContext);
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        const fetchAvatar = async () => {
            if (isAuthenticated && username) {
                try {
                    const userProfile = await getUserProfile(username);
                    console.log('Fetched user profile:', userProfile);
                    if (userProfile.avatar) {
                        const url = `https://footy-bet.pockethost.io/api/files/_pb_users_auth_/${userProfile.id}/${userProfile.avatar}`;
                        console.log('Avatar URL:', url);
                        setAvatarUrl(url);
                    } else {
                        console.log('No avatar found for user');
                        setAvatarUrl(null);
                    }
                } catch (error) {
                    console.error('Error fetching user avatar:', error);
                    setAvatarUrl(null);
                }
            }
        };

        fetchAvatar();
    }, [isAuthenticated, username]);

    const defaultAvatarUrl = "../../public/img/default-avatar.png"; 

    return (
        /*<nav className="flex items-center justify-between flex-wrap mx-1 p-0">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link className="home-logo" to="/"><img  className="fill-current h-20 w-67 mr-2" src="../../public/img/logo.svg" /></Link>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                {isAuthenticated && (
                     <>
                        <h4 className="block mt-4 lg:inline-block lg:mt-0 hover:text-teal-500 mr-4">Welcome, {username}.</h4>
                        <div className="text-sm flex lg:flex-grow">
                            <Link to="/wallet" className="block lg:mt-0 hover:text-teal-500 ml-12 pt-2  mr-4">
                                Wallet
                            </Link>
                            <Link to="/profile" className="block lg:mt-0 hover:text-teal-500 ml-8 pt-2  mr-4">
                                Profile
                            </Link>
                            <Link to="/logout" className="inline-block ml-auto text-sm mr-10 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout</Link>
                        </div>
                     </>
                     
                )}
                
                {!isAuthenticated && (
                    <div className="flex ml-auto">
                        <Link to="/login" className="inline-block text-sm mr-10 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login</Link>
                        <Link to="/signup" className="inline-block  text-sm mr-10 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>*/
        <nav className="flex items-center justify-between flex-wrap mx-1 p-0">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link className="home-logo" to="/"><img className="fill-current h-20 w-67 mr-2" src="../../public/img/logo.svg" alt="Logo" /></Link>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                {isAuthenticated && (
                    <>
                        <div className="flex items-center">
                            <img
                                src={avatarUrl || defaultAvatarUrl}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full mr-2"
                                onError={(e) => {
                                    console.error('Error loading avatar image');
                                    e.target.src = defaultAvatarUrl;
                                }}
                            />
                            <h4 className="block mt-4 lg:inline-block lg:mt-0 hover:text-teal-500 mr-4">Welcome, {username}.</h4>
                        </div>
                        <div className="text-sm flex lg:flex-grow">
                            <Link to="/wallet" className="block lg:mt-0 hover:text-teal-500 ml-12 pt-2  mr-4">
                                Wallet
                            </Link>
                            <Link to="/profile" className="block lg:mt-0 hover:text-teal-500 ml-8 pt-2  mr-4">
                                Profile
                            </Link>
                            <Link to="/logout" className="inline-block ml-auto text-sm mr-10 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout</Link>
                        </div>
                    </>
                )}
                
                {!isAuthenticated && (
                    <div className="flex ml-auto">
                        <Link to="/login" className="inline-block text-sm mr-10 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login</Link>
                        <Link to="/signup" className="inline-block  text-sm mr-10 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}