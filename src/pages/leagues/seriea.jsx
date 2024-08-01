import React from 'react';

import Sidebar from '../../components/sidebar/Sidebar';
import SerieAGames from '../../components/league-games/SerieAGames';
import Betslip from '../../components/betslip/Betslip';

const SerieA = () => (
  <div className="container flex mt-1">
          
      <Sidebar />
      <SerieAGames />
      <Betslip />
    
  </div>
);

export default SerieA;