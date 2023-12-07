import React from 'react';

import Sidebar from '../../components/sidebar/Sidebar';
import MainContent from '../../components/main-content/MainContent';
import Betslip from '../../components/betslip/Betslip';

const Home = () => (
  <div className="container flex mt-1">
          
      <Sidebar />
      <MainContent />
      <Betslip />
    
  </div>
);

export default Home;