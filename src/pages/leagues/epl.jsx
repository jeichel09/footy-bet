import React from 'react';

import Sidebar from '../../components/sidebar/Sidebar';
import EplGames from '../../components/league-games/EplGames';
import Betslip from '../../components/betslip/Betslip';

const Epl = () => (
  <div className="container flex mt-1">
          
      <Sidebar />
      <EplGames />
      <Betslip />
    
  </div>
);

export default Epl;