import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import "./category.css";
import {useDispatch, useSelector} from 'react-redux'
import { getPostsBasedOnCategory } from "../../redux/api/postApiCall";
import { Link } from "react-router-dom";
const Category = () => {
    const  dispatch = useDispatch();
    const { category } = useParams();
    const {posts} = useSelector(state => state.post);
    useEffect(()=>{
      dispatch(getPostsBasedOnCategory(category));
    },[]);
    useEffect(() => {
      window.scrollTo(0,0);
    }, []);

    if(posts.length === 0){
      return (
        <>
        <div className="category-not-found">
          <div className="message">
            category not found
          </div>
          <Link className="not-found-link" to="/posts">
            go to post home
          </Link>
        </div>
        </>
      );
    }
    else{
      return ( 
        <div className="category">
            <h1 className="category-title">Posts based on {category}</h1>
            <PostList posts={posts} />
        </div>
         );
    }
}
 
export default Category;