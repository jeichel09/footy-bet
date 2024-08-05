import Sidebar from "../../components/sidebar/Sidebar";
import WithdrawalPage from "../../components/withdrawal-page/WithdrawalPage";
import Betslip from "../../components/betslip/Betslip";

const Withdrawal = () => {
    return (
        <div className="container flex mt-1">
            <Sidebar />
            <WithdrawalPage />
            <Betslip />
        </div>
    )
}

export default Withdrawal