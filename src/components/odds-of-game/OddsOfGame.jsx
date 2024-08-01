import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import AuthContext from "../../contexts/authContext";
import { getGameOdds } from "../../services/oddsApiService";
import getImagePath from "../../utils/getImagePath";

export default function OddsOfGame() {
    const navigateTo = useNavigate();
    const [game, setGame] = useState({});
    const [loading, setLoading] = useState(true);
    const [h2h, setH2h] = useState([]);
    const [totals, setTotals] = useState([]);
    
    const { isAuthenticated, username } = useContext(AuthContext);
    const { league, gameId } = useParams();

    useEffect(() => {
        if (league && gameId) {
            getGameOdds(league, gameId)
            .then(setGame);
        }
        
        
    }, [league, gameId]); 
  
    const h2hPrices = async (game) => {
        if (!game || !game.bookmakers || !game.bookmakers.length) {
            return (
              <div>
                <h2 className="text-red-600">Loading...</h2>
              </div>
            );
        } else {
            try {
                const prices = game.bookmakers
                    .flatMap(bookmaker =>
                        bookmaker.markets
                        .filter(market => market.key === 'h2h')
                        .flatMap(market =>
                            market.outcomes.map(outcome => ({
                            team: outcome.name,
                            price: outcome.price,
                            }))
                        )
                    );
                return prices;
            } catch (error) {
                console.error('Error extracting H2H Prices:', error);
                return [];
            }
        }
    };    
        
    const totalsPrices = async (game) => {
        if (!game || !game.bookmakers || !game.bookmakers.length) {
            return (
              <div>
                <h2 className="text-red-600">Loading...</h2>
              </div>
            );
        } else {
            try {
                const prices = game.bookmakers
                    .flatMap(bookmaker =>
                        bookmaker.markets
                        .filter(market => market.key === 'totals')
                        .flatMap(market =>
                            market.outcomes.map(outcome => ({
                            name: outcome.name,
                            price: outcome.price,
                            point: outcome.point,
                            }))
                        )
                    );
                return prices;
            } catch (error) {
                console.error('Error extracting Totals Prices:', error);
                return [];
            }
        }    
    };
    
    async function fetchH2hPrices() {
        const h2h = await h2hPrices(game);
        return h2h;
    }
    
    async function fetchTotalsPrices() {
        const totals = await totalsPrices(game);
        return totals;
    }

    useEffect(() => {
        fetchH2hPrices().then(data => { 
            setH2h(data);
    })}, []);

    useEffect(() => {
        fetchTotalsPrices().then(data => { 
            setTotals(data);
    })}, []);
  
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
                      <div className="border m-2 border-solid items-center border-gray-800 bg-yellow-300 hover:bg-yellow-600 grid grid-cols-2">
                          <span className="text-center">{h2h[0] && h2h[0].team}</span>
                          <span className="text-center">{h2h[0] && h2h[0].price}</span>
                      </div>
                      <div className="border m-2 border-solid items-center border-gray-800 bg-yellow-300 hover:bg-yellow-600 grid grid-cols-2">
                          <span className="pl-2 text-center">{h2h[2] && h2h[2].team}</span>
                          <span className="text-center">{h2h[2] && h2h[2].price}</span>
                      </div>
                      <div className="border m-2 border-solid items-center border-gray-800 bg-yellow-300 hover:bg-yellow-600 grid grid-cols-2">
                          <span className="text-center">{h2h[1] && h2h[1].team}</span>
                          <span className="text-center">{h2h[1] && h2h[1].price}</span>
                      </div>
                  </div>
              </div>
              <div className="grid grid-rows-2 text-black gap-3">
                  <h2 className="p-6">Totals:</h2>
                  <div className="grid grid-cols-2">
                      <div className="border m-2 border-solid items-center border-gray-800 bg-yellow-300 hover:bg-yellow-600 grid grid-cols-2">
                          <span className="text-center">{totals[0] && totals[0].name} {totals[0] && totals[0].point}</span>
                          <span className="text-center">{totals[0] && totals[0].price}</span>
                      </div>
                      <div className="border m-2 border-solid items-center border-gray-800 bg-yellow-300 hover:bg-yellow-600 grid grid-cols-2">
                          <span className="text-center">{totals[1] && totals[1].name} {totals[1] && totals[1].point}</span>
                          <span className="text-center">{totals[1] && totals[1].price}</span>
                      </div>
                  </div>
              </div>
          </div>
      </main>
      );
  };

    

    


    
