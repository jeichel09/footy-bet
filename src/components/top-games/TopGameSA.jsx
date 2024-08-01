import { getOneSA } from "../../services/oddsApiService";
import formatDate from "../../utils/formatDate";
import getImagePath from "../../utils/getImagePath";

const TopGameSA = () => {
    const sa = getOneSA();
    const sa_kickoff = formatDate(sa.commence_time);

    return (
        <div className="border mx-4 border-solid border-gray-700 rounded p-5 text-center">
            <h4 className="pb-4">Top Game Serie A</h4>
            <div className="grid grid-cols-4">
                <img src={getImagePath(sa.home_team)} alt={`${sa.home_team} Logo`} className="w-8 h-8 mx-auto"/>
                <span>{sa.home_team} - {sa.away_team}</span>
                <img src={getImagePath(sa.away_team)} alt={`${sa.away_team} Logo`} className="w-8 h-8 mx-auto"/>
                <span>Kickoff: {sa_kickoff}</span>
            </div>
        </div>
    );
};

export default TopGameSA;