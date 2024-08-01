import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";

export default function SingleGameItem({
    id,
    sport_key,
    home_team,
    away_team,
    commence_time
}) {
    return (
        <li>
            <Link to={`/games/${sport_key}/${id}`} className='grid grid-cols-2 bg-gray-200 hover:bg-teal-500 hover:text-white p-1 shadow-md rounded-md'>
                <div className='mx-auto'>{home_team} vs {away_team}</div>
                <div className='ml-auto mr-8'>Kickoff: {formatDate(commence_time)}</div>
            </Link>
        </li>
    );
}