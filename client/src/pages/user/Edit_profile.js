import React, { useEffect, useState } from 'react';
import "./Edit_profile.css";
import userBlue from "../user/userBlue.png";
import { useNavigate } from 'react-router-dom';
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import { baseUrl, token } from "../../config/constants";
import { toast } from "react-toastify";

const Edit_profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    type: "",
    photo: null,
    id: ""
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      setUser({ ...user.attributes, id: user.id });
      setState({
        type: user.attributes.type,
        name: user.attributes.name,
        email: user.attributes.email,
        photo: [user.attributes.photo?.data?.id]
      });
      setImage(user.attributes.photo?.data?.attributes?.url ? baseUrl + user.attributes.photo.data.attributes.url : null);
    }
  }, []);

  const [image, setImage] = useState(null);

  const [state, setState] = useState({
    type: "",
    name: "",
    email: "",
    password: "",
    photo: [],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(
      `${baseUrl}/api/customers/${user.id}`,
      {
        "data": state
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authentication': `Bearer ${token}`
        }
      }
    ).then((res) => {
      axios.get(
        `${baseUrl}/api/customers?populate=*&fields[0]=email&fields[1]=name&fields[2]=type&filters[email][$eq]=${state.email}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authentication': `Bearer ${token}`
          }
        }
      ).then((res) => {
        if (res?.data?.data?.length) {
          localStorage.setItem("user", JSON.stringify(res.data.data[0]))
          toast("Successful");
          navigate("/profile");
          setTimeout(() => {
            window.location.reload()
          }, 200)
        } else {
          toast.error("invalid email or password");
        }
      })
    });
    console.log(state);
  };

  const handleFileUpload = (event) => {
    let formData = new FormData();
    formData.append("files", event.target.files[0]);

    axios.post(
      `${baseUrl}/api/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authentication': `Bearer ${token}`
        }
      }
    ).then((res) => {
      // toast("Successful");
      if (res.data.length) {
        setState({ ...state, photo: [res.data[0].id] });
        setImage(baseUrl + res.data[0].url);
      }
    });
  };

  return (
    <div className='container_edit_profile'>
      <br></br><br></br>
      <h2>Account Information</h2><br />

      {image ? <img src={image} height="100px" width="100px" alt='' /> : <img src={userBlue} height="100px" width="100px" alt='' />}
      
      <div className='logo_upload_add_store'>
      <button type="button" className='button_add_store'>
          <i className='icon_upload_add_store'><FaUpload />&nbsp;Upload your profile picture</i>
          <input onChange={handleFileUpload} type="file" />
        </button>
      </div>
      <br/>
      {/* <h4>Account Type</h4> */}
      <form onSubmit={handleSubmit}>
        <div className='checkbox'>
          <input
            type="radio"
            id="signup_check"
            name="signup_check"
            checked={state.type === "personal"}
            onChange={() => setState(({ ...state, type: "personal" }))}
          /> Personal

          <input
            type="radio"
            id="signup_check"
            name="signup_check"
            checked={state.type === "business"}
            onChange={() => setState(({ ...state, type: "business" }))}
          /> Business
        </div>
        <div className='edit_info'>
          <div className='info'>
            <span className='info_name'>Name</span>
            <input
              type="text"
              id='name'
              placeholder='Name'
              required
              value={state.name}
              onChange={(event) => setState(({ ...state, name: event.target.value }))}
            />
          </div>
          <div className='info'>
            <span className='info_name'>Email</span>
            <input
              type="email"
              id='email'
              placeholder='Email'
              required
              value={state.email}
              onChange={(event) => setState(({ ...state, email: event.target.value }))}
            />
          </div>
        </div>
        <button className='save_btn_edit_profile' type="submit">Update</button>
      </form>
    </div>
  );
};

export default Edit_profile;
