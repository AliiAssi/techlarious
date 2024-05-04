import './updatecomment.css'
import { toast} from "react-toastify";
import { useState } from "react";

const UpdateComment = ({ setUpdateComment }) => {
  const [text, setText] = useState("this is so great");

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    console.log({text});
  };

  return (
    <div className="update-comment">
      <form onSubmit={formSubmitHandler} className="update-comment-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateComment(false)}
            className="bi bi-x-circle-fill update-comment-form-close"
          ></i>
        </abbr>
        <h1 className="update-comment-title">Edit Comment</h1>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          className="update-comment-input"
          placeholder="Update Comment"
        />
        <button type="submit" className="update-comment-btn">
          Edit Comment
        </button>
      </form>
    </div>
  );
};

export default UpdateComment;
