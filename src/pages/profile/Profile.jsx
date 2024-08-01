import Sidebar from "../../components/sidebar/Sidebar";
import UserProfile from "../../components/user-profile/UserProfile";
import Betslip from "../../components/betslip/Betslip";

const Profile = () => {
  return (
    <div className="container flex mt-1">
        <Sidebar />
        <UserProfile />
        <Betslip />
    </div>
  )
}

export default Profile