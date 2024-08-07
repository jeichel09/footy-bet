import Sidebar from "../../components/sidebar/Sidebar";
import WalletPage from "../../components/wallet/WalletPage";
import Betslip from "../../components/betslip/Betslip";

const Wallet = () => {
  return (
    <div className="container flex mt-1">
        <Sidebar />
        <WalletPage />
        <Betslip />
    </div>
  )
}

export default Wallet