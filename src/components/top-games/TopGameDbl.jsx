import { getOneDbl } from "../../services/oddsApiService";
import formatDate from "../../utils/formatDate";
import getImagePath from "../../utils/getImagePath";

const TopGameDbl = () => {
    const dbl = getOneDbl();
    const dbl_kickoff = formatDate(dbl.commence_time);

    return (
        <div className="border mx-4 border-solid border-gray-700 rounded p-5 text-center">
            <h4 >Top Game EPL</h4>
            <div className="grid grid-cols-5">
                <img src={getImagePath(dbl.home_team)} alt={`${dbl.home_team} Logo`} className="w-8 h-8 mx-auto"/>
                <span>{dbl.home_team} - {dbl.away_team}</span>
                <img src={getImagePath(dbl.away_team)} alt={`${dbl.away_team} Logo`} className="w-8 h-8 mx-auto"/>
                <span>|  Kickoff: {dbl_kickoff}</span>
            </div>
        </div>
    );
};

export default TopGameDbl;