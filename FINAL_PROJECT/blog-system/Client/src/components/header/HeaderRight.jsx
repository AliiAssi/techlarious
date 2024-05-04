import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../../redux/api/authApiCall";
const HeaderRight = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const { user } = useSelector((state) => state.auth);
  const {profile} = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  if (user)
    return (
      <>
        <div className="header-right">
          <div
            className={`menu ${isDropdownOpen ? "active" : ""}`}
            onClick={handleMenuClick}
          >
          <div className="profile-picture">
              <img src={user?.profilePhoto.url} alt="Profile" />
          </div>
            <div className="username">
              <span>{profile?.username || user?.username}</span>
              <span
                className={`chevron ${isDropdownOpen ? "up" : "down"}`}
              ></span>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-div">
                <div className="profile-option">
                  <Link to={`/profile/${user?._id}`} className="c">Profile</Link>
                </div>
                <div className="logout-option">
                  <Link onClick={()=>{dispatch(logoutUser())}} className="c1">Logout</Link>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </>
    );
  else {
    return (
      <div className="header-right">
        <Link className="header-right-link" to="/login">
          <i className="bi bi-box-arrow-in-right"></i>
          <span>Login</span>
        </Link>
        <Link className="header-right-link" to="/register">
          <i className="bi bi-person-plus"></i>
          <span>Register</span>
        </Link>
      </div>
    );
  }
};

export default HeaderRight;
