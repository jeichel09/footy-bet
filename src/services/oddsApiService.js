import { useState, useEffect } from "react";

const fetchOne = (league) => {
    const [game, setGame] = useState([]);
    //const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchGame = async () => {
            //setLoading(true);

            try {
                const res = await fetch(`https://api.the-odds-api.com/v4/sports/${league}/odds?apiKey=b3dece76c2bf709f5eb1805492d2f538&regions=eu&bookmakers=pinnacle&markets=h2h,totals&oddsFormat=decimal`);
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

const fetchAll = (league) => {
    const [games, setGames] = useState([]);
    //const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchGames = async () => {
            //setLoading(true);

            try {
                const res = await fetch(`https://api.the-odds-api.com/v4/sports/${league}/odds?apiKey=b3dece76c2bf709f5eb1805492d2f538&regions=eu&bookmakers=pinnacle&markets=h2h,totals&oddsFormat=decimal`);
                const data = await res.json();
                
                setGames(data);
            } catch (error) {
                console.error('Error fetching games:', error);
            } 
            //finally { setLoading(false); }
        };
        
        fetchGames();
    }, [league]);
    
    return games;
};

export const getGameOdds = async (league, gameId) => {
            try {
                const res = await fetch(`https://api.the-odds-api.com/v4/sports/${league}/events/${gameId}/odds?apiKey=b3dece76c2bf709f5eb1805492d2f538&regions=eu&markets=h2h,totals&bookmakers=pinnacle&oddsFormat=decimal`);
                const event = await res.json();
                //console.log(event);
                return event;
            } catch (error) {
                console.error('Error fetching event:', error);
            } 
}

export const getOneEpl = () => fetchOne('soccer_epl');
export const getOneLL = () => fetchOne('soccer_spain_la_liga');
export const getOneDbl = () => fetchOne('soccer_germany_bundesliga');
export const getOneSA = () => fetchOne('soccer_italy_serie_a');
export const getOneL1 = () => fetchOne('soccer_france_ligue_one');

export const getAllEpl = () => fetchAll('soccer_epl');
export const getAllLL = () => fetchAll('soccer_spain_la_liga');
export const getAllDbl = () => fetchAll('soccer_germany_bundesliga');
export const getAllSA = () => fetchAll('soccer_italy_serie_a');
export const getAllL1 = () => fetchAll('soccer_france_ligue_one');

