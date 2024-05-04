import "./commentlist.css";
import { useState } from "react";
import swal from "sweetalert";
import UpdateComment from "./UpdateComment";
import { useSelector } from "react-redux";

const CommentList = ({ comments }) => {
  const [updateComment, setUpdateComment] = useState(false);

  const deleteCommentHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("comment has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Something went wrong!");
      }
    });
  };
  const {user} = useSelector(state => state.auth)

  return (
    <>
      <div className="comment-list">
        <h4 className="comment-list-count">{comments.length} comments</h4>
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <div className="comment-item-info">
              <div className="comment-item-user-info">
                <img
                  src="/images/user-avatar.png"
                  alt=""
                  className="comment-item-user-photo"
                />
                <span className="comment-item-username">
                  {comment.username}
                </span>
              </div>
              <div className="comment-item-time">{comment.createdAt}</div>
            </div>
            <p className="comment-item-text">{comment.text}</p>
            {user && user._id === comment.user._id &&
              <div className="comment-item-icon-wrapper">
              <i
                onClick={() => setUpdateComment(true)}
                className="bi bi-pencil-square"
              ></i>
              <i
                onClick={deleteCommentHandler}
                className="bi bi-trash-fill"
              ></i>
            </div>
           }
          </div>
        ))}
        {updateComment && <UpdateComment setUpdateComment={setUpdateComment} />}
      </div>
    </>
  );
};

export default CommentList;
