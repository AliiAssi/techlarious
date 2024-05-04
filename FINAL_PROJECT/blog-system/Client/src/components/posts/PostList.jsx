import PostItem from '../posts/PostItem';
import "./post.css";

const PostList = ({ posts }) => {
  return (
    <>
      <div className="post-list">
        {posts.map((item) => (
          <PostItem key={item._id} post={item} />
        ))}
      </div>
    </>
  );
};

export default PostList;
