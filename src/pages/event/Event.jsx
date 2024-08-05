import Sidebar from '../../components/sidebar/Sidebar';
//import GameOddsDisplay from '../../components/odds-of-game/GameOddsDisplay';
import OddsOfGame from '../../components/odds-of-game/OddsOfGame';
import Betslip from '../../components/betslip/Betslip';

const Event = ({ league, gameId }) => (
  <div className="container flex mt-1">
          
      <Sidebar />
      <OddsOfGame />
      <Betslip />
    
  </div>
);

export default Event;