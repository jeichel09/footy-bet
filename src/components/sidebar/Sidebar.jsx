import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";


export default function Sidebar() {
    return (
        <aside className="sidebar w-1/5 mx-1" >
            <h3 className="px-16 pt-10">Bet on the top european leagues</h3>
            <ul className="pl-12 pt-20">
                <li className="mb-8 items-center hover:text-teal-500">
                    <Link to="/leagues/epl" className="flex flex-row league-select">
                    <img className="w-10 h-10 mr-3" src="../../public/img/epl.png" />
                <span className="my-auto">English Premier League</span></Link>
                </li>
                <li className="mb-8 flex items-center hover:text-teal-500">
                    <Link to="/leagues/laliga" className="flex flex-row league-select">
                    <img className="w-10 h-10 mr-3" src="../../public/img/laliga.png" />
                    <span className="my-auto">Spanish La Liga</span></Link>
                </li>
                <li className="mb-8 flex items-center hover:text-teal-500">
                    <Link to="/leagues/dbl" className="flex flex-row league-select">
                    <img className="w-10 h-10 mr-3" src="../../public/img/dbl.png" />
                    <span className="my-auto">German Bundesliga</span></Link>
                </li>
                <li className="mb-8 flex items-center hover:text-teal-500">
                    <Link to="/leagues/serieA" className="flex flex-row league-select">
                    <img className="w-10 h-10 mr-3" src="../../public/img/serieA.png" />
                    <span className="my-auto">Italian Serie A</span></Link>
                </li>
                <li className="flex items-center hover:text-teal-500">
                    <Link to="/leagues/ligue1" className="flex flex-row league-select">
                    <img className="w-10 h-10 mr-3" src="../../public/img/ligue1.png" />
                    <span className="my-auto">French Ligue 1</span></Link>
                </li>
            </ul>
        </aside>
    );
}
        {/*<>
            <Link to='/'>
                <div>
                    <span className='text-xl font-medium whitespace-nowrap dark:text-white'>
                        English Premier League
                    </span>
                </div>
            </Link>
        </> */}
    


