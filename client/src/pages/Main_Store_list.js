import React, {Fragment, useEffect, useState} from 'react'
import "./Main_Store_list.css";
import logo from "../images/logo.png";
import {Link, useParams} from 'react-router-dom'
import axios from "axios";
import {baseUrl} from "../config/constants";

const Main_Store_list = () => {
    const { id } = useParams();
    const [stores, setStores] = useState([]);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        console.log(window.location, ' path')
        const pathName = window.location.pathname.split("/")
        console.log(pathName)
        if (pathName[1] === "category") {
            axios.get(`${baseUrl}/api/stores?populate=*&filters[category][id]=${id}`).then((res) => {
                if (res?.data?.data?.length) setStores(res.data.data)
            });
        } else {
            axios.get(`${baseUrl}/api/stores?populate=*&filters[title][$eq]=${id}`).then((res) => {
                if (res?.data?.data?.length) setStores(res.data.data)
            });
        }


        axios.get(`${baseUrl}/api/categories/${id}`).then((res) => {
            if (res?.data?.data?.id) setCategory(res.data.data)
        });
    }, [])


    return (
        <div className='container_firstcategory'>
            <div className='header'>
                <h1>{category?.attributes?.title}</h1>

            </div>
            <br></br>
            <div className='flex_container1'>
                {stores.map((store, si) => (
                    <Link to={`/store/${store.id}`} key={si}>
                        <div className='flex_box1'>
                          {store?.attributes?.photo?.data?.length ? (
                          <img src={`${baseUrl}${store.attributes.photo.data[0].attributes.url}`} height="75px" width="75px" alt=""/>
                          ) : (
                          <img src={logo} height="75px" width="75px" alt="" />
                          )}
                          
                          {/* <img src={`${baseUrl}${store?.attributes?.photo?.data?.length ? store?.attributes?.photo?.data[0]?.attributes?.url : ""}`} height="75px" width="75px" alt=''/>  */}
                            <p1>{store.attributes.title}</p1>
                            <div className='rating_store'>
                                {(store?.attributes?.rating / store?.attributes?.reviews) > 0 ? (
                                    <Fragment>
                                        <input type="radio" name="rate" id="rate1"/><label htmlFor="rate1"></label>
                                    </Fragment>
                                ) : null}
                                {(store?.attributes?.rating / store?.attributes?.reviews) > 1 ? (
                                    <Fragment>
                                        <input type="radio" name="rate" id="rate2"/><label htmlFor="rate2"></label>
                                    </Fragment>
                                ) : null}
                                {(store?.attributes?.rating / store?.attributes?.reviews) > 2 ? (
                                    <Fragment>
                                        <input type="radio" name="rate" id="rate3"/><label htmlFor="rate3"></label>
                                    </Fragment>
                                ) : null}
                                {(store?.attributes?.rating / store?.attributes?.reviews) > 3 ? (
                                    <Fragment>
                                        <input type="radio" name="rate" id="rate4"/><label htmlFor="rate4"></label>
                                    </Fragment>
                                ) : null}
                                {(store?.attributes?.rating / store?.attributes?.reviews) > 4 ? (
                                    <Fragment>
                                        <input type="radio" name="rate" id="rate5"/><label htmlFor="rate5"></label>
                                    </Fragment>
                                ) : null}
                            </div>
                            <h3>{store?.attributes?.reviews} reviews</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Main_Store_list
