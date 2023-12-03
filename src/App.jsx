import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import MainContent from "./components/main-content/MainContent";
import Betslip from "./components/betslip/Betslip";

function App() {
  return (
    <>
      <Navbar />
      <div className="container flex mt-1">
        
          <Sidebar />
          <MainContent />
          <Betslip />
        
      </div>
    </>
  )
}

export default App
