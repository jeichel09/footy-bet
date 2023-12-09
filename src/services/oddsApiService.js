import { useState, useEffect } from "react";

/*export async function fetchTopGame(league){
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const res = await fetch(`https://api.the-odds-api.com/v4/sports/${league}/odds?apiKey=c560d1173aa814556e5c83b86856399e&regions=eu&bookmakers=pinnacle&markets=h2h,totals&oddsFormat=decimal`);
                const data = await res.json();
                const topgame = data[0];
                console.log(topgame);
                setGames(topgame);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };
        
        fetchGame();
    }, []);
}*/


const fetchOne = (league) => {
    const [game, setGame] = useState([]);
    //const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchGame = async () => {
            //setLoading(true);

            try {
                const res = await fetch(`https://api.the-odds-api.com/v4/sports/${league}/odds?apiKey=c560d1173aa814556e5c83b86856399e&regions=eu&bookmakers=pinnacle&markets=h2h,totals&oddsFormat=decimal`);
                const data = await res.json();
                const topgame = data[0];
                setGame(topgame);
            } catch (error) {
                console.error('Error fetching games:', error);
            } 
            //finally { setLoading(false); }
        };
        
        fetchGame();
    }, [league]);

    return game;
};

export const getOneEpl = () => fetchOne('soccer_epl');
export const getOneLL = () => fetchOne('soccer_spain_la_liga');
export const getOneDbl = () => fetchOne('soccer_germany_bundesliga');
export const getOneSA = () => fetchOne('soccer_italy_serie_a');
export const getOneL1 = () => fetchOne('soccer_france_ligue_one');
