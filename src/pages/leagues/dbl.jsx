import React from 'react';

import Sidebar from '../../components/sidebar/Sidebar';
import DblGames from '../../components/league-games/DblGames';
import Betslip from '../../components/betslip/Betslip';

const Dbl = () => (
  <div className="container flex mt-1">
          
      <Sidebar />
      <DblGames />
      <Betslip />
    
  </div>
);

export default Dbl;