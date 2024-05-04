import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost, setToggleLike, updatePostImage } from "../../redux/api/postApiCall";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdatePost from "./UpdatePost";
import "./PostDetails.css";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);
  const [likeStatus, setLikeStatus] = useState(post?.post?.likes.length);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [id, dispatch]);

  useEffect(() => {
    setLikeStatus(post?.post?.likes.length);
  }, []);

  const getRandomImage = () => {
    const imagesLink = [
      "https://th.bing.com/th/id/OIP.u5jd2IbRxY-2XbqPYC4AAgHaEo?w=276&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://th.bing.com/th/id/OIP.1YM53mG10H_U25iPjop83QHaEo?w=276&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://th.bing.com/th?id=ORMS.22c135a8a04941cb307c0a6c70511e21&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1.25&p=0",
      "https://th.bing.com/th?id=OIP.bPBCgvp9N0SUbVYJnBg2IQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      "https://th.bing.com/th?id=OIP.nyFLBYjD207JNHC4hBQBAwHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    ];
    const randomIndex = Math.floor(Math.random() * imagesLink.length);
    return imagesLink[randomIndex];
  };

  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("There is no file!");
    const formData = new FormData();
    formData.append('image', file);
    dispatch(updatePostImage(formData,  post?.post._id))
  };
  //console.log("in the post details :" + post.post._id);
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Post has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Something went wrong!");
      }
    });
  };

  return (
    <div className="post-details">
      <div className="post-details-image-wrapper">
        <img
          src={file ? URL.createObjectURL(file) : getRandomImage()}
          alt=""
          className="post-details-image framed"
        />
        {user && post?.post?.user?._id === user?._id && (
          <form
            className="update-post-image-form"
            onSubmit={updateImageSubmitHandler}
          >
            <label className="update-post-image" htmlFor="file">
              <i className="bi bi-image-fill"></i> Select new image
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">Upload</button>
          </form>
        )}
      </div>
      <h1 className="post-details-title">{post?.post?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={post?.post?.user?.profilePhoto.url}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.post?.user?._id}`}>
              {post?.post?.user?.username}
            </Link>
          </strong>
          <span>{post?.post?.createdAt}</span>
        </div>
      </div>
      <p className="post-details-description">
        {post?.post?.description}
      </p>
      <div className="post-details-icon-wrapper">
        <div>
          {user && (
            <>
              <i
                className={`bi ${post?.post?.likes.includes(user?._id) ? "bi-hand-thumbs-fill" : "bi-hand-thumbs"}`}
                onClick={() => dispatch(setToggleLike(post?.post?._id))}
              ></i>
              <div className="likes-container">
                <small>
                  <span className="likes-count">{likeStatus}</span>
                  <span className="likes-text">likes</span>
                </small>
              </div>
            </>
          )}
        </div>
        {user && user._id === post?.post?.user._id && (
          <div>
            <i
              className="bi bi-pencil-square"
              onClick={() => setUpdatePost(true)}
            ></i>
            <i className="bi bi-trash-fill" onClick={deletePostHandler}></i>
          </div>
        )}
      </div>
      {user && <AddComment />}
      {post && post?.post?.comments?.length !== 0 && (
        <CommentList comments={post?.post?.comments} />
      )}
      {updatePost && <UpdatePost post={post?.post} setUpdatePost={setUpdatePost} />}
    </div>
  );
};

export default PostDetails;
