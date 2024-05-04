import "./profile.css";
import PostList from "../../components/posts/PostList";
import { posts } from "../../dummyData";
import { useEffect, useState } from "react";
import UpdateProfile from "./UpdateProfile";
import swal from "sweetalert";
import { toast } from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, uploadProfilePhoto } from "../../redux/api/profileApiCall";

const Profile = () => {
  const dispatch = useDispatch();
  const [updateProfile, setUpdateProfile] = useState(false);
  const [file, setFile] = useState(null);

  const {id} = useParams();

  useEffect(() => {
    dispatch(getUser(id));
    window.scrollTo(0, 0);
  }, [id]);

  const {profile} = useSelector(state => state.profile);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(!file) return toast.warning("there is no image to uploaded!");
    const formData = new FormData()
    formData.append("image",file)
    dispatch(uploadProfilePhoto(formData));
  }

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Account has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Something went wrong!");
      }
    });
  }
  const path = profile?.profilePhoto.url;
  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
        {
          file && (
            <img src={URL.createObjectURL(file)} alt="" className="profile-image" />
          )
        }
        {
          !file && (
            <img src={path} alt="image" className="profile-image" />
          )
        }

          <form onSubmit={formSubmitHandler}>
          <abbr title="choose profile photo">
            <label
              htmlFor="file"
              className="bi bi-camera-fill upload-profile-photo-icon"
            ></label>
          </abbr>
            <input
              type="file"
              name="file"
              id="file"
              style={{ display: "none" }}
              onChange={e => setFile(e.target.files[0])}
            />
            <button type="submit" className="upload-profile-photo-btn">upload</button>
          </form>
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">
          {profile?.bio}
        </p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>{new Date(profile?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
          <i className="bi bi-file-person-fill"></i>
          Update Profile
        </button>
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
        <PostList posts={posts} />
      </div>
      <button onClick={deleteAccountHandler} className="delete-account-btn">
        Delete Your Account
      </button>
      {updateProfile && <UpdateProfile profile={profile} setUpdateProfile={setUpdateProfile} />}
    </section>
  );
};

export default Profile;
