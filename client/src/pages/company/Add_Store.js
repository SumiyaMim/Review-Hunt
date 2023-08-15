import React, {useEffect, useState} from 'react'
import "./Add_Store.css";
import logo from "../company/logo.png";
import {FaUpload} from "react-icons/fa";
import axios from "axios";
import {baseUrl, token} from "../../config/constants";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Add_Store = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState("");

    useEffect(() => {
        axios.get(`${baseUrl}/api/categories`).then((res) => {
            if (res?.data?.data?.length) setCategories(res.data.data)
        })
    }, [])

    const [state, setState] = useState({
        title: "",
        description: "",
        address: "",
        facebook: "",
        website: "",
        email: "",
        category: [],
        customer: user?.id,
        photo: []
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(
            `${baseUrl}/api/stores`,
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
            toast("Successful");
            setTimeout(() => {
                navigate("/")
            }, 200)
        })

        console.log(state);
    }

    const handleFileUpload = (event) => {
        console.log(event)
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
                setState({...state, photo: [res.data[0].id]});
                setImage(baseUrl + res.data[0].url);
            }
        })
    }

    return (
        <div className='container_add_store'><br></br><br></br>
            <h2>Store Information</h2><br></br>
            
            <div className='content_add_store'>

                {image ? <img src={image} height="100px" width="100px" alt=''/> : <img src={logo} height="100px" width="100px" alt=''/>}
                
                <div className='logo_upload_add_store'>
                    <button type="button" className='button_add_store'>
                        <i className='icon_upload_add_store'><FaUpload/>&nbsp;Upload company logo</i>
                        <input onChange={handleFileUpload} type="file"/>
                    </button>
                </div>
                <br/>
                <form onSubmit={handleSubmit}>
                    <div className='add_store_info'>
                        <div className='info'>
                            <span className='info_name'>Company Name</span>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                onChange={(event) => setState({...state, title: event.target.value})}
                                required
                            />
                            <br/>
                        </div>
                        <div className='info'>
                            <span className='info_name'>Description</span>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                onChange={(event) => setState({...state, description: event.target.value})}
                            />
                            <br/>
                        </div>
                        <div className='info'>
                            <span className='info_name'>Address</span>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                onChange={(event) => setState({...state, address: event.target.value})}
                            />
                            <br/>
                        </div>
                        <div className='info'>
                            <span className='info_name'>Email</span>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={(event) => setState({...state, email: event.target.value})}
                                required
                            />
                            <br/>
                        </div>
                        <div className='info'>
                            <span className='info_name'>Website</span>
                            <input
                                type="text"
                                id="website"
                                name="website"
                                onChange={(event) => setState({...state, website: event.target.value})}
                            />
                            <br/>
                        </div>
                        <div className='info'>
                            <span className='info_name'>Social Media</span>
                            <input
                                type="text"
                                id="facebook"
                                name="facebook"
                                onChange={(event) => setState({...state, facebook: event.target.value})}
                            />
                            <br/>
                        </div>
                        <div className='info'>
                            <span className='info_name'>Category</span>
                            <select onChange={(event) => setState({...state, category: [event.target.value]})} required>
                                <option value="">Select One</option>
                                {categories.map((category, ci) => (
                                    <option value={category.id} key={ci}>{category.attributes.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <br/>
                    <button className="save_btn_add_store" type="submit">SAVE</button>
                </form>
            </div>
        </div>
    )
}

export default Add_Store
