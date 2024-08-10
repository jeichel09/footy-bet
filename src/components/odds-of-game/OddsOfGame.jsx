import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { getGameOdds } from "../../services/oddsApiService";
import getImagePath from "../../utils/getImagePath";

export default function OddsOfGame({ onBetSelect }) {
    const navigateTo = useNavigate();
    const [game, setGame] = useState(null);
    const [selectedBet, setSelectedBet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { isAuthenticated, username } = useContext(AuthContext);
    const { league, gameId } = useParams();

    useEffect(() => {
        async function fetchGameData() {
            if (league && gameId) {
                try {
                    setLoading(true);
                    const gameData = await getGameOdds(league, gameId);
                    setGame(gameData);
                } catch (err) {
                    console.error('Error fetching game data:', err);
                    setError('Failed to load game data');
                } finally {
                    setLoading(false);
                }
            }
        }
        
        fetchGameData();
    }, [league, gameId]);

    const extractPrices = (game, marketKey) => {
        if (!game || !game.bookmakers || !game.bookmakers.length) {
            return [];
        }
        let prices = game.bookmakers
            .flatMap(bookmaker =>
                bookmaker.markets
                    .filter(market => market.key === marketKey)
                    .flatMap(market =>
                        market.outcomes.map(outcome => ({
                            ...outcome,
                            team: outcome.name,
                        }))
                    )
            );

        if (marketKey === 'h2h') {
            prices = [
                { ...prices.find(p => p.team === game.home_team), bet_choice: '1' },
                { ...prices.find(p => p.team === 'Draw'), bet_choice: 'X' },
                { ...prices.find(p => p.team === game.away_team), bet_choice: '2' }
            ].filter(Boolean);
        } else if (marketKey === 'totals') {
            prices = prices.map(price => ({
                ...price,
                bet_choice: price.name === 'Over' ? 'Over' : 'Under'
            }));
        }

        return prices;
    };

    const h2hPrices = game ? extractPrices(game, 'h2h') : [];
    const totalsPrices = game ? extractPrices(game, 'totals') : [];

    const handleBetClick = (bet) => {
        setSelectedBet(bet);
        let betChoice;
        
        if (bet.name === 'Over' || bet.name === 'Under') {
            betChoice = `${bet.name} ${bet.point}`;
        } else { 
            betChoice = bet.name === game.home_team ? '1' : bet.name === 'Draw' ? 'X' : '2';
        }
        onBetSelect({
            gameId: game.id,
            league: league,
            home_team: game.home_team,
            away_team: game.away_team,
            commence_time: game.commence_time,
            bet_choice: betChoice,
            quote: bet.price
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;
    if (!game) return <div>No game data available</div>;

    return (
        <main className="main-content w-3/5 font-semibold">
            <div className="w-3/4 mx-auto bg-gray-500 shadow-md rounded-md mt-12">
                <div className="grid grid-cols-3 bg-teal-200 h-20 items-center text-black shadow-md rounded-t-md">
                    <img src={getImagePath(game.home_team)} alt={`${game.home_team} Logo`} className="w-12 h-12 mx-auto"/>
                    <span>{game.home_team} - {game.away_team}</span>
                    <img src={getImagePath(game.away_team)} alt={`${game.away_team} Logo`} className="w-12 h-12 mx-auto"/>
                </div>
                <div className="grid grid-rows-2 text-black gap-3">
                    <h2 className="p-6">Moneyline:</h2>
                    <div className="grid grid-cols-3">
                        {h2hPrices.map((price, index) => (
                            <div 
                                key={index} className={`border m-2 border-solid items-center border-gray-800 ${
                                selectedBet === price ? 'bg-yellow-600' : 'bg-yellow-300 hover:bg-yellow-600' } 
                                grid grid-cols-2 cursor-pointer`} onClick={() => handleBetClick(price)}>
                                    <span className="text-center">{price.team}</span>
                                    <span className="text-center">{price.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-rows-2 text-black gap-3">
                    <h2 className="p-6">Totals:</h2>
                    <div className="grid grid-cols-2">
                        {totalsPrices.map((price, index) => (
                            <div 
                                key={index} className={`border m-2 border-solid items-center border-gray-800 ${
                                selectedBet === price ? 'bg-yellow-600' : 'bg-yellow-300 hover:bg-yellow-600'
                                } grid grid-cols-2 cursor-pointer`}
                                onClick={() => handleBetClick(price)}>
                                    <span className="text-center">{price.name} {price.point}</span>
                                    <span className="text-center">{price.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}