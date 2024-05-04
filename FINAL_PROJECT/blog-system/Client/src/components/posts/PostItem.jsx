import { useEffect } from "react";
import { Link } from "react-router-dom";


const imagesLink = [
  "https://th.bing.com/th/id/OIP.u5jd2IbRxY-2XbqPYC4AAgHaEo?w=276&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://th.bing.com/th/id/OIP.1YM53mG10H_U25iPjop83QHaEo?w=276&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://th.bing.com/th?id=ORMS.22c135a8a04941cb307c0a6c70511e21&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1.25&p=0",
  "https://th.bing.com/th?id=OIP.bPBCgvp9N0SUbVYJnBg2IQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  "https://th.bing.com/th?id=OIP.nyFLBYjD207JNHC4hBQBAwHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
];
function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * imagesLink.length);
  return imagesLink[randomIndex];
}

const PostItem = ({post}) => {

  const path = getRandomImage();
  return (
    <div className="post-item">
      <div className="post-item-image-wrapper">
        <img src={path} alt="" className="post-itme-image" />
      </div>
      <div className="post-item-info-wrapper">
        <div className="post-item-info">
          <div className="post-item-author">
            <strong>Author: </strong>
            <Link to={`/profile/${post?.user._id}`}><span>{post?.user.username}</span></Link>
          </div>
          <div className="post-itme-date">
            {new Date(post?.createdAt).toDateString()}
          </div>
        </div>
        <div className="post-item-details">
          <h4 className="post-item-title">{post.title}</h4>
          <Link className="post-item-category" to="/">{post.category}</Link>
        </div>
        <p className="post-item-description">
          {post.description}
        </p>
        <Link className="post-item-link" to={`/posts/details/${post._id}`}>
          Read More...
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
