import Banner from '../../components/banner/Banner';
import {posts,categories} from '../../dummyData';
import PostList from '../../components/posts/PostList';
import { Link } from 'react-router-dom';
import './home.css';
import Sidebar from '../../components/sidebar/Sidebar';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { getPosts } from '../../redux/api/postApiCall';
const Home = () => {
    const dispatch = useDispatch();
    const {posts} = useSelector(state => state.post)
    useEffect(()=>{
        dispatch(getPosts(1));
    },[])

    return (<>
    <Banner></Banner>
    <div className="home-latest-post">Latest Posts</div>
    <div className="home-container">
        <PostList posts={posts.slice(0,3)}></PostList>
        <Sidebar categories={categories} ></Sidebar>
    </div>
    <div className="home-see-posts-link">
        <Link className="home-link" to="/posts">
          See All Posts 
        </Link>
    </div>
    </>);
}
 
export default Home;