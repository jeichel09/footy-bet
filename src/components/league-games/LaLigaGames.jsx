import { getAllLL } from '../../services/oddsApiService';

import getImagePath from "../../utils/getImagePath";

import SingleGameItem from './SingleGameItem';



const LaLigaGames = () => {

    const games = getAllLL();
    return (
        <main className="main-content w-3/5">
            <h2 className='underline font-bold justify-self-center mt-4 text-center'>Spanish La Liga Games:</h2>
            <ul className='border text-black mx-4 mt-10 border-solid border-gray-700 rounded p-5  grid grid-rows-22 gap-2'>
                {games.map((game) => (
                   <SingleGameItem key={game.id} {...game}/> 
                ))}
            </ul>


        </main>
    );
};

export default LaLigaGames;