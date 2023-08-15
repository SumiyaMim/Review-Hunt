import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import "./Category.css"
import {baseUrl} from "../config/constants";
import axios from "axios";

const Category = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(`${baseUrl}/api/categories?populate=*`).then((res) => {
            console.log(res.data.data); // Check the response data in the console
            if (res?.data?.data?.length) setCategories(res.data.data)
        })
    }, []);

    console.log(categories)

    return (
        <div className='container_category'>
            <div className='header'>
                <h1>CATEGORY</h1>
            </div>
            <br></br>
            <div className='flex_container'>
                {categories.map((category, ci) => (
                    <Link to={`/category/${category.id}`} key={ci}>
                        <div className='flex_box'>
                            <li className='icon_category'>
                                <img src={`${baseUrl}${category?.attributes?.image?.data?.attributes?.url}`} height="30px" width="30px" alt='' />
                                &nbsp;&nbsp; {category.attributes.title}</li>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Category
