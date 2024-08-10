import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
//import GameOddsDisplay from '../../components/odds-of-game/GameOddsDisplay';
import OddsOfGame from '../../components/odds-of-game/OddsOfGame';
import Betslip from '../../components/betslip/Betslip';

const Event = ({ league, gameId }) => {
    const [selectedBet, setSelectedBet] = useState(null);

    const handleBetSelect = (bet) => {
        setSelectedBet(bet);
    };

    const handleBetConfirm = () => {
        setSelectedBet(null);
    }
    
    return (
        <div className="container flex mt-1">
                
            <Sidebar />
            <OddsOfGame onBetSelect={handleBetSelect} />
            <Betslip selectedBet={selectedBet} onBetConfirm={handleBetConfirm} />
          
        </div>
    );
};
export default Event;