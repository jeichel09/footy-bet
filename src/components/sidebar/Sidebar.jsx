export default function Sidebar() {
    return (
        <aside className="sidebar w-1/5 mx-1" >
            <h3 className="px-16 pt-10">Bet on the top european leagues</h3>
            <ul className="pl-12 pt-20">
                <li className="mb-8 flex items-center hover:text-teal-500">
                    <img className="w-10 h-10 mr-3" src="../../public/img/epl.png" />
                English Premier League
                </li>
                <li className="mb-8 flex items-center hover:text-teal-500">
                    <img className="w-10 h-10 mr-3" src="../../public/img/laliga.png" />
                Spanish La Liga
                </li>
                <li className="mb-8 flex items-center hover:text-teal-500">
                    <img className="w-10 h-10 mr-3" src="../../public/img/dbl.png" />
                German Bundesliga
                </li>
                <li className="mb-8 flex items-center hover:text-teal-500">
                    <img className="w-10 h-10 mr-3" src="../../public/img/serieA.png" />
                Italian Serie A
                </li>
                <li className="flex items-center hover:text-teal-500">
                    <img className="w-10 h-10 mr-3" src="../../public/img/ligue1.png" />
                French Ligue 1
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
    


