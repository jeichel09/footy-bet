import { useState, useEffect } from 'react';
import { getGameOdds } from '../../services/oddsApiService'; 

const GameOddsDisplay = ({ league, gameId }) => {
  const [odds, setOdds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const data = await getGameOdds(league, gameId);
        setOdds(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch odds');
        setLoading(false);
      }
    };

    fetchOdds();
  }, [league, gameId]);

  const extractH2HPrices = (game) => {
    if (!game || !game.bookmakers || !game.bookmakers.length) {
      return [];
    }

    return game.bookmakers
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
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  const h2hPrices = extractH2HPrices(odds);

  return (
    <div>
      <h2>Game Odds</h2>
      {h2hPrices.length > 0 ? (
        <ul>
          {h2hPrices.map((price, index) => (
            <li key={index}>
              {price.team}: {price.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No odds available for this game.</p>
      )}
    </div>
  );
};

export default GameOddsDisplay;