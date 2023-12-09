import { getOneEpl } from "../../services/oddsApiService";
import formatDate from "../../utils/formatDate";
import getImagePath from "../../utils/getImagePath";

const TopGameEpl = () => {
    const epl = getOneEpl();
    const epl_kickoff = formatDate(epl.commence_time);

    return (
        <div className="border mx-4 border-solid border-gray-700 rounded p-5 text-center">
            <h4 >Top Game EPL</h4>
            <div className="grid grid-cols-5">
                <img src={getImagePath(epl.home_team)} alt={`${epl.home_team} Logo`} className="w-8 h-8 mx-auto"/>
                <span>{epl.home_team} - {epl.away_team}</span>
                <img src={getImagePath(epl.away_team)} alt={`${epl.away_team} Logo`} className="w-8 h-8 mx-auto"/>
                <span>|  Kickoff: {epl_kickoff}</span>
            </div>
        </div>
    );
};

export default TopGameEpl;