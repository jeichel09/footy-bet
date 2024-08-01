import { getOneLL } from "../../services/oddsApiService";
import formatDate from "../../utils/formatDate";
import getImagePath from "../../utils/getImagePath";

const TopGameLL = () => {
    const ll = getOneLL();
    const ll_kickoff = formatDate(ll.commence_time);

    return (
        <div className="border mx-4 border-solid border-gray-700 rounded p-5 text-center">
            <h4 className="pb-4">Top Game La Liga</h4>
            <div className="grid grid-cols-4">
                <img src={getImagePath(ll.home_team)} alt={`${ll.home_team} Logo`} className="w-8 h-8 mx-auto"/>
                <span>{ll.home_team} - {ll.away_team}</span>
                <img src={getImagePath(ll.away_team)} alt={`${ll.away_team} Logo`} className="w-8 h-8 mx-auto"/>
                <span>Kickoff: {ll_kickoff}</span>
            </div>
        </div>
    );
};

export default TopGameLL;