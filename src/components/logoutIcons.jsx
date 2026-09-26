import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

const LogoutIcon = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
   
    try {
    const userId = localStorage.getItem("userId");
      await axios.post(
        "http://localhost:3000/api/auth/signout",
        { "uid": userId}, // body (empty if you don’t need to send anything)
      /*   {
          withCredentials: true, // important if using cookies/session
        } */
      );

      // Clear stored tokens
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      // Redirect to home page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <FiLogOut
      size={24}
      style={{ cursor: "pointer" }}
      onClick={handleLogout}
      title="Sign Out"
    />
  );
};

export default LogoutIcon;