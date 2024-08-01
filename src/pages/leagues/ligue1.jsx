import React from 'react';

import Sidebar from '../../components/sidebar/Sidebar';
import Ligue1Games from '../../components/league-games/Ligue1Games';
import Betslip from '../../components/betslip/Betslip';

const Ligue1 = () => (
  <div className="container flex mt-1">
          
      <Sidebar />
      <Ligue1Games />
      <Betslip />
    
  </div>
);

export default Ligue1;