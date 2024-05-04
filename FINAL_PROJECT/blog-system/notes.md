in the server side of the program process:
---------------------------------------------------------------- 
- I installed the {express, cors , dotenv, mongoose, nodemon in the dev mode} packages // we need to install also the body-parser package
  to be noted ==> to install the {nodemon in the dev mode}: npm i -D nodemon
- I created the .env file {to initialize the port of the server, and the development mode , and the uri connection to the mongoose server}
- I created the folder of the  configuration in order to create the connection to the Db file {config/connectToDb.js}
- I created the models folders to create the data base models {user model ... etc}
  to be noted ===> " https://pixabay.com/ " : from this website i can find some beautiful photos or avatars...etc
  can also check the user model in the models folder
- I created the controllers folder:

  --      '          I created the authentication file controller      '   --
  [NB: i installed many packages that i will be using it to authenticate => npm i joi  bcryptjs express-async-handler]
  'we prefer to validate the user credentials in the user model / CHECK it'
  ==> AuthController.js::register {
      @description:: Register new user account
      @router::      /api/auth/register
      @method::      post
      @access::      public
        // 1.validations
        // 2.is user already registered ??
        // hash user password
        // new user and save it in database
        // send response to client
  }
    => AuthController.js::login {
      @description:: login user
      @router::      /api/auth/login
      @method::      post
      @access::      public
        // 1.validations
        // 2.is user exist ??
        // 3.check  user password
        // 4.generate token(jwt token)
        // 5.send response to client
  }
- IN my second day of the development :
  when i test the authenticate register function api ==> a message error is returned "request body is undefined"
  so i install a body-parser
  1) {npm install body-parser}
  2) then i require it in my server file "main file"
  3) then i use it when i write :{app.use(bodyParser)}
- title : "Authentication login User Token Created"
  command: npm install jsonwebtoken
  generate at the model user: /*
  userSchema.methods.generateAuthToken = function(){
    return jwt.sign(
        { id: this._id,
          isAdmin:this.isAdmin
        }, 
        process.env.SECRETKEY, 
        { expiresIn: '30d' }
    );
    }
                              */
  it`s good to mention that the method should be written before the 
  /* const User = mongoose.model('User', userSchema); */
  {we should know that is called OOP issues ^_^ in javascript}







--                'i created the user file controller '    --
- I require the asyncHandler package
  1) i need to create a function that get all users profiles informations
      userController::getAllUsersCtrl
    {
      @desc get all users profiles informations
      @route  /api/users/profiles
      @method get
      @access private (only accessible from admin)
    }
   [
    the access mode private (only accessible from admin) requires from me to
    *create a folder middleware
    *then to create a verify token file middleware
    *then to import jwt package
    *then to create a middleware function
    *then to add the verify token middleware function in the route 
     n.b : if the function return any result then the second function"getAllUsers" does not called
     n.b.: it s good to say that the middleware function "verifyTokenAndAdmin" is very impotant 
   ]   
   2) i need to create a function that get one user
      userController::getUserProfileCtrl 
    {
      @description get user profile by id 
      @route /api/users/profile/:id
      @method GET
      @access public
    }     
    [
      *the access mode is public access
      *in the userRoute:: i write( 
        {
          code => router.route('/profile/:id')
                  .get(validateObjectId,getUserProfileCtrl)
        }
      )
    ]
    3) i need to create a function that update the user profile
       userController::updateUserProfileCtrl
       {
        @description update user profile
        @route /api/users/profile/:id
        @method PUT
        @access private{only user himself}
       }
       [
        *the access mode is private from the user himself
        *in the userRoute:: can write(
          {
            code => router.route('/profile/:id')
                    .put(validateObjectId,verifyTokenAndOnlyUserHimself,updateUserProfileCtrl);
          }
        )
       ]
    4) i need to create a function for uploading profile picture of the user
      ==> we use :" npm i multer cloudinary "
       userController::uploadingProfilePictureCtrl
       {
        @description profile photo uploading
        @route /api/users/profile/profile-photo-upload
        @method post
        @access private(only logged user can upload profile picture)
       }
       [
        *the access mode is private from a logged in user
        * i create a middleware that requires the multer package
          that establishe the storaging of the pictures and the uploading of it
        *bhmne a3rf eno esem l file bl server aam jibo mnl middleware   : name = req.file.filename  wl be2e easy
       ]
     5) i need to create a function for delete the picture [easy]
     6) i need to create a function for delete user profile 
        userController::deleteUserProfile
        {
          @description deleteUserProfile
          @route /api/users/profile/:id
          @method delete
          @access private(only administrator)
        }
        [
          *the access mode is not allowed for all, only for an administrator or for the user himself
          *so we need the verifyTokenAndOnlyUserHimselfOrAdmin   middleware to check the process
        ]  

--                POST? MODEL' model/Post.js '       --
-should know that each post is refer to one user 
 we can implement this relation with adding 
 user column or field to the model
 `user :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
 }
 `
-should know that the likes filed for the post must be an array of users id
  `
  likes:[
          {
              type: mongoose.Schema.Types.ObjectId,
              ref:"User",
          }
    ]
  `



--               postController             --
1) create a new post: create a function that will be called to create a new post 
postController:: createPostCtrl
{
  @desc create a new post
  @route /api/post/
  @method POST
  @access private : only logged in user
}
2) get all posts
postController:: getAllPostsCtrl
{
  @desc get all posts
  @route /api/post/
  @method GET
  @access public
}
[
*all posts:                   allPosts = await Post.find()
*mnl ajdad                    .sort({ created_at: -1 })
*including user informations  .populate("user",["-password"]);
 without the password     
]
3) get single post
4) get number of posts
5) deltePostCtrl
postController::deletePostCtrl{
  @access private{only user logged or the admin}
  ==>{
    if(req.user.isAdmin || req.user.id == post.user.toString() )
  }
}
6) update the post 
postController::updatePostCtrl{
  @access private{only user logged}
  ==>{
    if(req.user.id == post.user.toString() )
  }
}
7) update the picture of the post
postController::updatePostPictureCtrl{
  @access private{only user logged}
}
8) toggle like 
postController::toggleLikeCtrl{
  api/post/like/:id
  PUT
  only logged in user
}

**********************/


// populate posts that belongs to this user when he/she get his/her profile
UserSchema.virtual("posts",{
    ref : "Post",
    foreignField : "user" // in the post collection i wanna relate  User to  the user included in the post collection
    ,localField : "_id"  // where _id == _id
})
/*
toJSON:{virtuals:true},
toObject:{virtuals:true}*/
yaane hon la7 ykhla2 virtual relation between two collections 
**********************/

--------------------------------------------------------------------------------------------------------------------- - - 
// ?in the client side of the process:
----------------------------------------------------------------
- installation of the "npm i bootstrap@5.3.2" || or <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
- dowloading some images 

-mention that when i wanna build a react component ,i have to write sfc then type enter
//!----------------
-Header Component:
//!----------------
->header left
->navbar
->header right
-we use a useState for the navigation status bar
  if it is not true dont show navigation
  mention that the process of navigation enabled in the responsive mode
  exemple:
  const [toggle ,setToggle] = useState(false);
  in the action action of the menu button :
  ()=>{setToggle(prev => !prev)}

-when the navigation has been spareted to  3 components
 each one maybe need the toggle and the setToggle function
 so  from properties :

 //? <HeaderLeft toggle={toggle} setToggle={setToggle}>
 in the header left function:
 //? const HeaderLeft = ({ setToggle, toggle }) => {return(...);}

 -react is a single page project 
 in my project i needed more than one page 
 i will install react router dom:
 "npm i react-router-dom  "

 -inside the app.jsx:
 i put all the projects inside the browserRouter 
 i have the header common between all the pages 
 so i put it in the first and before <Routes>

 - look:
 //?<Link onClick={() => setToggle(false)} 
 //!   to="/" 
 //?   className="nav-link">
- note :  <input
          className="create-post-upload"
          type="file"
          name="file"
          id="file"
          onChange={(e)=>{setFile(e.target.files[0])}}
        />

-1)npm i react-toastify
 2)then in the index.jsx:import 'react-toastify/dist/ReactToastify.css'
 3)then in the create post file :
   1)import {toast, ToastContainer} from 'react-toastify'
   2) if(checkInputVide(Title) || checkInputVide(Description) || checkInputVide(Category)){
            toast.error('enter all credentials');
      }
   3)
   return (
    <div className="container">
        <ToastContainer ></ToastContainer>
      <div className="text">
        Create Blog
      </div>   

      .....
    )
   4) i can style the ToastContainer
    ==> <ToastContainer theme="colored" osition="top-center">
- const formData = new FormData();
  formData.append('image', File);//key value
  formData.append('title', Title);//key value
  formData.append('description', Description);//key value
  formData.append('category', Category);//key value      
  
  5)in the front end , if you want to get an id from the url prams:
    //? http://localhost:5173/posts/details/2 ==> http://localhost:5173/posts/details/:id
    i have to : import {useParams} from 'react-router-dom'
    then : const {id} = useParams();
  6)        <img src={file ? URL.createObjectURL(file):post.image} alt="" className="post-details-image framed" />
    when i select a file the image drc will change dynamically
  7)install 'npm install sweetaler'  if you need a styled popup window

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
  8) routing grouping
  before: 
  <Route path='/posts' element={<PostsPage />} > </Route>
  <Route path='/posts/details/:id' element={<PostDetails />}></Route>
  <Route path='/posts/categories/:category' element={<Category />}></Route>
  <Route path='/posts/createPost' element={<Creation />} > </Route>     
  after:
  <Route path='posts'>
          <Route index element={<Home />} />
          <Route path='details/:id' element={<PostDetails />} />
          <Route path='categories/:category' element={<Category />} />
          <Route path='createPost' element={<Creation />} />
  </Route>

----------------------------------------------------------------
//! Redux Toolkit:
*******************
in the client side of the application i wanna use //? Redux //?
for the State Mangement System of the application  
the states will be stored into the Redux
all components will get their informations from the Redux (from the store object of the redux)
+ every request will be sent from redux

the command installation:
'npm install @reduxjs/toolkit react-redux'

in the src folder of the client server
i create the redux folder
inside it i create the store file to save the store object
and inside it too ,i will create 2 folders {api and slices}
----------------------------------------------------------------
authSlice :
-------------
const authSlice = createSlice(
    {
        name: 'auth',
        initialState : {
            user: null,
        }, //? the initial state of auth,
        reducers: {
          /*setUser(state){
            state.user = ...;
          }*/
          login(state,action){
            state.user = action.payload;//? the payload is the user object in the json response
          }
        }//? the setState of the auth, actions
    }
);
const authReducer = authSlice.reducer; //? the auth reducer or state
const authActions = authSlice.actions; //? the auth actions or setState
export {authActions, authReducer} //? export the auth


in the store file:
-------------------
step one:
---------
const store = configureStore(
{
    reducer:{
        auth : authReducer, //? setting the auth reducer
    }
}
);
--------------------------------
in the auth api call :
-----------------------
step one:
---------
export function loginUser(user){
    return async(dispatch)=>{
        try
        {
            const response = await fetch("http://127.0.0.1:3000/api/auth/login",{
                method: "POST",
                body:JSON.stringify(user),
                headers :{
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            dispatch(authActions.login(data));//? here we setting the new state of the auth
        }
        catch(error){
            console.log(error);
        }
    }
}
----------------------------------
in the main.jsx file
---------------------
we need the store object from redux folder 
we need the provider from react-redux
*****
import store from './redux/store.js';
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> //! the provider 
      <App />
    </Provider>
  </React.StrictMode>
)
---------------------------------------
in the login.jsx:
-------------------
import { useDispatch } from "react-redux";
  const dispatch = useDispatch();
      dispatch(loginUser({email,password}));
---------------------------------------
in the header right :
-----------------------
import { useSelector } from "react-redux";

const { user } = useSelector((state) => state.auth);
if(user){<eshya>} else{<eshyaTene>}

in the auth slice :
----------------------
const authSlice = createSlice(
    {
        name: 'auth',
        initialState : {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null //? eza deja eemel login aw la
        },
        reducers: {
            login(state,action){
                state.user = action.payload;
            },
        }
    }
);

in the api auth call:
---------------------
export function loginUser(user){
    return async(dispatch)=>{
        try
        {
            const reponse = await fetch("http://127.0.0.1:3000/api/auth/login",{
                method: "POST",
                body:JSON.stringify(user),
                headers :{
                    "Content-Type": "application/json"
                }
            });
            const data = await reponse.json();
            dispatch(authActions.login(data));
            localStorage.setItem("user", JSON.stringify(data));//? save it into local storage object
        }
        catch(error){
            console.log(error);
        }
    }
}


------------------------------------------------
npm i axios
-----------
create the utils folder 
create the request file
------------------------------
navigation
----------------
method 1:
************          
const user = useSelector(state=>state.auth);          
<Route path='login' element={!user ?  <Login />  : <Navigate to="/" />} />
//? if the user is logged on navigate to the home page

method 2:
***********
const navigate = useNavigate();
//go to home
navigate("/");
