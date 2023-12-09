import { getOneL1 } from "../../services/oddsApiService";
import formatDate from "../../utils/formatDate";
import getImagePath from "../../utils/getImagePath";

const TopGameL1 = () => {
    const l1 = getOneL1();
    const l1_kickoff = formatDate(l1.commence_time);

    return (
        <div className="border mx-4 border-solid border-gray-700 rounded p-5 text-center">
            <h4 >Top Game EPL</h4>
            <div className="grid grid-cols-5">
                <img src={getImagePath(l1.home_team)} alt={`${l1.home_team} Logo`} className="w-8 h-8 mx-auto"/>
                <span>{l1.home_team} - {l1.away_team}</span>
                <img src={getImagePath(l1.away_team)} alt={`${l1.away_team} Logo`} className="w-8 h-8 mx-auto"/>
                <span>   |  Kickoff: {l1_kickoff}</span>
            </div>
        </div>
    );
};

export default TopGameL1;