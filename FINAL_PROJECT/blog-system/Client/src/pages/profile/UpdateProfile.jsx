import "./updateprofile.css";
import { toast } from "react-toastify";
import { useState } from "react";
import {useDispatch,} from "react-redux";
import { updateProfile } from "../../redux/api/profileApiCall";
const UpdateProfile = ({ profile,setUpdateProfile }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [password, setPassword] = useState("");
  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(username.trim() === ''){
        toast.error('Please enter a username');return;
    }
    const updatedUser = { username, bio };
    if (password.trim() !== "") {
      updatedUser.password = password;
    }
    dispatch(updateProfile(profile?.id,updatedUser))
    setUpdateProfile(false);
  };

  return (
    <div className="update-profile">
    <form onSubmit={formSubmitHandler} className="update-profile-form">
      <abbr title="close">
        <i
          onClick={() => setUpdateProfile(false)}
          className="bi bi-x-circle-fill update-profile-form-close"
        ></i>
      </abbr>
      <h1 className="update-profile-title">Update Your Profile</h1>
      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        className="update-profile-input"
        placeholder="Username"
      />
      <input
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        type="text"
        className="update-profile-input"
        placeholder="Bio"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="update-profile-input"
        placeholder="Password"
      />
      <button type="submit" className="update-profile-btn">
        Update Profile
      </button>
    </form>
  </div>
  );
};

export default UpdateProfile;



