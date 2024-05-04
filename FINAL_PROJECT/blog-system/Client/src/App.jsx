import './App.css';
import Header from './components/header/Header';
import {BrowserRouter , Routes, Route,Navigate} from  'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/forms/Login';
import Register from './pages/forms/Register';
import AdminDashborad from './pages/admin/AdminDashboard';
import PostsPage from './pages/posts/postsPage';
import Footer  from './components/footer/Footer';
import Creation from './pages/createPost/Creation';
import PostDetails from './pages/post-details/PostDetails';
import { ToastContainer } from 'react-toastify';
import Category from './pages/category/Category';
import Profile from './pages/profile/Profile';
import UpdateProfile from './pages/profile/UpdateProfile';
import UsersTable from './pages/admin/UsersTable';
import PostsTable from './pages/admin/PostsTable.';
import CategoriesTable from './pages/admin/CategoriesTable';
import CommentsTable from './pages/admin/CommentsTable';
import ForgotPassword from './pages/forms/ForgotPassword';
import ResetPassword from './pages/forms/NewPassword';
import NotFound from './pages/notFound/NotFound';
import { useSelector } from 'react-redux';

function App() {
  const {user } = useSelector(state => state.auth);

  return (
    <>
    <BrowserRouter>
    <ToastContainer theme='colored' position='top-center' />
      <Header />
      <Routes>
  
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='login' element={!user ?  <Login />  : <Navigate to='/' /> } />
          <Route path='register' element={!user ?  <Register />  : <Navigate to='/' /> } />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
        </Route>

        <Route path='posts'>
          <Route index element={<PostsPage />} />
          <Route path='details/:id' element={<PostDetails />} />
          <Route path='categories/:category' element={<Category />} />
          <Route path='createPost' element={user ? <Creation /> : <Navigate to='/'/>} />
        </Route>

        <Route path='profile/:id' element={<Profile />}></Route>

        {
          user && user?.isAdmin && (
          <Route path='admin-dashboard' > 
            <Route index element={<AdminDashborad />}></Route>
            <Route path='users-table' element={<UsersTable />}></Route>
            <Route path='posts-table' element={<PostsTable />}></Route>
            <Route path='categories-table' element={<CategoriesTable />}></Route>
            <Route path='comments-table' element={<CommentsTable />}></Route>
          </Route>
          )
        }

        <Route path='*' element={<NotFound />}></Route>
      </Routes>

      <Footer></Footer>
    </BrowserRouter>
    </>
  )
}

export default App
