import React, { useEffect, useState } from 'react';
import './creation.css';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { createNewPost } from '../../redux/api/postApiCall';
const Creation = () => {
    const dispatch = useDispatch();
    const [Title,setTitle] = useState('');
    const [Category, setCategory] = useState('');
    const [Description,setDescription] = useState('');
    const [File,setFile] = useState(null);
    
    const {loading,isPostCreated} = useSelector(state => state.post);
    const navigate = useNavigate();

    //form submission handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(checkInputVide(Title) || checkInputVide(Description) || checkInputVide(Category)){
            toast.error('1-enter all credentials');
        }
        if(!file){
            toast.error('file is required');
        }

        const formData = new FormData();
        formData.append('image', File);//key value
        formData.append('title', Title);//key value
        formData.append('description', Description);//key value
        formData.append('category', Category);//key value
        dispatch(createNewPost(formData ));

    
      };
      useEffect(()=>{
        if(isPostCreated){
          navigate(
            "/"
          ) 
        }
      },[isPostCreated,navigate])

    const checkInputVide = (input)=>{
        if(input.trim() === '') {return true;}
    }; 
  return (
    <div className="container">
      <div className="text">
        Create Blog
      </div>
      <form action="#" onSubmit={formSubmitHandler} >
        <div className="form-row">
          <div className="input-data">
            <input type="text" 
            onChange={(e) => {
                setTitle(e.target.value);
            }}
            value={Title} />
            <div className="underline"></div>
            <label htmlFor="">Title</label>
          </div>
        </div>
        <div className="form-row">
            <select 
            onChange={(e)=>{setCategory(e.target.value)}} 
            value={Category}
            className="create-post-input"
            >
            <option disabled value="">
                Select A Category
            </option>
            <option value="music">music</option>
            <option value="travelling">travelling</option>
            </select>
        </div>
        <div className="form-row">
        <input
          className="create-post-upload"
          type="file"
          name="file"
          id="file"
          onChange={(e)=>{setFile(e.target.files[0])}}
        />
        </div>
        <div className="form-row">
          <div className="input-data textarea">
            <textarea rows="8" cols="80"  onChange={(e)=>{setDescription(e.target.value)}} value={Description}></textarea>
            <br />
            <div className="underline"></div>
            <label htmlFor="">description</label>
            <br />
            <div className="form-row submit-btn">
              <div className="input-data">
                <div className="inner"></div>
                {!loading ?(
                  <input type="submit" value="save" />
                ):(
                  <input type="button" value="loading..." disabled />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Creation;
