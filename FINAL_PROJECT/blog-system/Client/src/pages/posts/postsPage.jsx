import "./posts-page.css";
import { useEffect, useState } from "react";
import PostList from '../../components/posts/PostList';
import Sidebar from '../../components/sidebar/Sidebar';
import Pagination from "../../components/pagination/Pagination";
import {useDispatch, useSelector} from 'react-redux';
import { getPosts, getpostsCount } from "../../redux/api/postApiCall";

const PostsPage = () => {
  const dispatch = useDispatch();
  const POST_PER_PAGE = 3;
  const [currentPage,setCurrentPage] = useState(1);
  const {postCount,posts} = useSelector(state => state.post);
  const pages = Math.ceil(postCount / POST_PER_PAGE);

  useEffect(() => {
    dispatch(getPosts(currentPage))
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(()=>{
    dispatch(getpostsCount())
  },[]);

  return (
    <>
      <br />
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar />
      </section>
      <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
    </>
  );
};

export default PostsPage;
