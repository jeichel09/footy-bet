import React from 'react';

import Sidebar from '../../components/sidebar/Sidebar';
import LaLigaGames from '../../components/league-games/LaLigaGames';
import Betslip from '../../components/betslip/Betslip';

const LaLiga = () => (
  <div className="container flex mt-1">
          
      <Sidebar />
      <LaLigaGames />
      <Betslip />
    
  </div>
);

export default LaLiga;