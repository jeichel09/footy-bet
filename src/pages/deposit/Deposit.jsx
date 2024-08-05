import Sidebar from "../../components/sidebar/Sidebar";
import DepositPage from "../../components/deposit-page/DepositPage";
import Betslip from "../../components/betslip/Betslip";

const Deposit = () => {
  return (
    <div className="container flex mt-1">
        <Sidebar />
        <DepositPage />
        <Betslip />
    </div>
  )
}

export default Deposit