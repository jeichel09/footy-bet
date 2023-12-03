export default function Navbar() {
    return (
        <nav className="flex items-center justify-between flex-wrap mx-1 p-0">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <img  className="fill-current h-20 w-67 mr-2" src="../../public/img/logo.svg" />
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 hover:text-teal-500 mr-4">
                    Wallet
                </a>
                <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 hover:text-teal-500 mr-4">
                    Profile
                </a>
                
                </div>
                <div>
                <a href="#" className="inline-block text-sm mr-10 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout</a>
                <a href="#" className="inline-block text-sm mr-10 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login</a>
                <a href="#" className="inline-block text-sm mr-10 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Sign Up</a>
                </div>
            </div>
        </nav>
    );
}