import React, {Fragment, useEffect, useState} from 'react'
import "./Aarong.css";
import logo from "../images/logo.png";
import usergray from "../images/usergray.png";
import {useNavigate, useParams} from 'react-router-dom';
import {FaShareAlt} from "react-icons/fa";
import {AiFillLike, AiFillDislike} from "react-icons/ai";
import {BsFlagFill} from "react-icons/bs";
import {AiOutlineMail} from "react-icons/ai";
import {FiLink} from "react-icons/fi";
import axios from "axios";
import {baseUrl} from "../config/constants";
import { VscCheck } from "react-icons/vsc";

const Aarong = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [store, setStore] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviewsDivider, setReviewsDivider] = useState({
        oneStar: 0,
        twoStar: 0,
        threeStar: 0,
        fourStar: 0,
        fiveStar: 0
    })

    const [user, setUser] = useState({
        name: "",
        email: "",
        type: "",
        photo: usergray
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.id) setUser(user.attributes)
    }, [])

    useEffect(() => {
        axios.get(`${baseUrl}/api/stores/${id}?populate=*`).then((res) => {
            if (res?.data?.data?.id) {
                setStore(res.data.data)
                setRating(res?.data?.data?.attributes?.rating / res?.data?.data?.attributes?.reviews)
            }
        })

        axios.get(`${baseUrl}/api/reviews?populate[0]=*&populate[1]=customer.photo&filters[store][id]=${id}`).then((res) => {
            let oneStar = 0, twoStar = 0, threeStar = 0, fourStar = 0, fiveStar = 0;
            if (res?.data?.data?.length) {
                setReviews(res.data.data)
                res.data.data.forEach((review) => {
                    if (review.attributes.rating === 1) oneStar++;
                    if (review.attributes.rating === 2) twoStar++;
                    if (review.attributes.rating === 3) threeStar++;
                    if (review.attributes.rating === 4) fourStar++;
                    if (review.attributes.rating === 5) fiveStar++;
                })

                setReviewsDivider({
                    oneStar,
                    twoStar,
                    threeStar,
                    fourStar,
                    fiveStar
                })
            }
        })
    }, [])

    // console.log(rating)

    // const averageRating = rating.toFixed(1);

    return (
        <div className='container_aarong'>
            <div class="header_aarong">
                {store?.attributes?.photo?.data?.length ? (
                <img src={`${baseUrl}${store?.attributes?.photo?.data[0]?.attributes?.url}`} height="110px" width="110px" alt=""/>
                ) : (
                <img src={logo} height="110px" width="110px" alt="" />
                )}
                {/* <img src={`${baseUrl}${store?.attributes?.photo?.data?.length ? store?.attributes?.photo?.data[0]?.attributes?.url : ""}`} height="110px" width="110px" alt=''/> */}
                <h1>{store?.attributes?.title}</h1>

                <div className='rating_company'>
                    {rating > 0 ? (
                        <Fragment>
                            <input type="radio" name="rate" id="rate1"/><label htmlFor="rate1"></label>
                        </Fragment>
                    ) : null}
                    {rating > 1 ? (
                        <Fragment>
                            <input type="radio" name="rate" id="rate2"/><label htmlFor="rate2"></label>
                        </Fragment>
                    ) : null}
                    {rating > 2 ? (
                        <Fragment>
                            <input type="radio" name="rate" id="rate3"/><label htmlFor="rate3"></label>
                        </Fragment>
                    ) : null}
                    {rating > 3 ? (
                        <Fragment>
                            <input type="radio" name="rate" id="rate4"/><label htmlFor="rate4"></label>
                        </Fragment>
                    ) : null}
                    {rating > 4 ? (
                        <Fragment>
                            <input type="radio" name="rate" id="rate5"/><label htmlFor="rate5"></label>
                        </Fragment>
                    ) : null}
                </div>
                <br/>
                <h3>{rating.toFixed(1)} Rating&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{store?.attributes?.reviews} Reviews</h3>
                {/* {averageRating >= 4 ? (
                    <div className='green'><i className='check'><VscCheck/></i></div>
                ) : (
                    <div className='red'><i className='check'><VscCheck/></i></div>
                )} */}
            </div>
            <div class="div1">
                <div class="first"><br></br>
                    <h2>About {store?.attributes?.title}</h2>
                    <p>{store?.attributes?.description}</p>
                    <p1>Contact</p1>
                    <br></br><br></br>
                    <i className='contact_icon'><AiOutlineMail/>
                        <p2>&nbsp; {store?.attributes?.email}</p2>
                    </i><br></br>
                    <i className='contact_icon'><FiLink/><a
                        href={store?.attributes?.facebook}>&nbsp; Visit Social Media</a></i><br></br><br></br>
                    <a href={store?.attributes?.website} className="website">Visit Website</a>
                    <br></br><br></br>
                    <input type="checkbox" id="check"></input>
                    <p3>Showroom Address</p3>
                    <br></br><br></br>
                    <p>{store?.attributes?.address}</p>
                  
                  
                </div>
                <div className='div2'>
                    <div className='box'>
                        <div className='box1'>
                        {user.photo && user?.photo?.data?.attributes?.url ? (
                        <img src={`${baseUrl}${user?.photo?.data?.attributes?.url}`} height="41px" width="43px" />
                        ) : (
                        <img src={usergray} height="41px" width="43px" />
                        )}

                           <div className='write'>
                                <button className='review' onClick={() => navigate(`/Review/${id}`)}> Write a review</button>
                                <div className='rating_write' onClick={() => navigate(`/Review/${id}`)}>
                                    <input type="radio" name="rate" id="rate1"/><label for="rate1"></label>
                                    <input type="radio" name="rate" id="rate2"/><label for="rate2"></label>
                                    <input type="radio" name="rate" id="rate3"/><label for="rate3"></label>
                                    <input type="radio" name="rate" id="rate4"/><label for="rate4"></label>
                                    <input type="radio" name="rate" id="rate5"/><label for="rate5"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='box2'>
                            <h3>Reviews</h3>
                            <h5>{store?.attributes?.reviews} total</h5>
                            <div className='company_performace'>
                                <div className='company_performace_wrapper'>
                                    <div className='comapny_progress_star_average'>
                                        <div className='comapny_progress_star'>5 star</div>
                                        <div className='company_progress_bar'>
                                            <progress className='progress_bar_data' max="100" value={parseInt(((reviewsDivider.fiveStar / store?.attributes?.reviews) * 100).toString())}></progress>
                                        </div>
                                        <div className='company_progress_bar_percentage'>{parseInt(((reviewsDivider.fiveStar / store?.attributes?.reviews) * 100).toString())}%</div>
                                    </div>
                                    <div className='comapny_progress_star_average'>
                                        <div className='comapny_progress_star'>4 star</div>
                                        <div className='company_progress_bar'>
                                            <progress className='progress_bar_data' max="100" value={parseInt(((reviewsDivider.fourStar / store?.attributes?.reviews) * 100).toString())}></progress>
                                        </div>
                                        <div className='company_progress_bar_percentage'>{parseInt(((reviewsDivider.fourStar / store?.attributes?.reviews) * 100).toString())}%</div>
                                    </div>
                                    <div className='comapny_progress_star_average'>
                                        <div className='comapny_progress_star'>3 star</div>
                                        <div className='company_progress_bar'>
                                            <progress className='progress_bar_data' max="100" value={parseInt(((reviewsDivider.threeStar / store?.attributes?.reviews) * 100).toString())}></progress>
                                        </div>
                                        <div className='company_progress_bar_percentage'>{parseInt(((reviewsDivider.threeStar / store?.attributes?.reviews) * 100).toString())}%</div>
                                    </div>
                                    <div className='comapny_progress_star_average'>
                                        <div className='comapny_progress_star'>2 star</div>
                                        <div className='company_progress_bar'>
                                            <progress className='progress_bar_data' max="100" value={parseInt(((reviewsDivider.twoStar / store?.attributes?.reviews) * 100).toString())}></progress>
                                        </div>
                                        <div className='company_progress_bar_percentage'>{parseInt(((reviewsDivider.twoStar / store?.attributes?.reviews) * 100).toString())}%</div>
                                    </div>
                                    <div className='comapny_progress_star_average'>
                                        <div className='comapny_progress_star'>1 star</div>
                                        <div className='company_progress_bar'>
                                            <progress className='progress_bar_data' max="100" value={parseInt(((reviewsDivider.oneStar / store?.attributes?.reviews) * 100).toString())}></progress>
                                        </div>
                                        <div className='company_progress_bar_percentage'>{parseInt(((reviewsDivider.oneStar / store?.attributes?.reviews) * 100).toString())}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {reviews.map((review, ri) => (
                        <div className='box' key={ri}>
                            <div className='box3'>
                                <img src={`${baseUrl}${review?.attributes?.customer?.data?.attributes?.photo?.data?.attributes?.url}`} height="41px" width="43px"/>
                                <h4>{review?.attributes?.customer?.data?.attributes?.name}</h4>
                                <hr></hr>
                                <div className='rating_user'>
                                    {review?.attributes?.rating > 0 ? (
                                        <Fragment>
                                            <input type="radio" name="rate" id="rate1"/><label htmlFor="rate1"></label>
                                        </Fragment>
                                    ) : null}
                                    {review?.attributes?.rating > 1 ? (
                                        <Fragment>
                                            <input type="radio" name="rate" id="rate2"/><label htmlFor="rate2"></label>
                                        </Fragment>
                                    ) : null}
                                    {review?.attributes?.rating > 2 ? (
                                        <Fragment>
                                            <input type="radio" name="rate" id="rate3"/><label htmlFor="rate3"></label>
                                        </Fragment>
                                    ) : null}
                                    {review?.attributes?.rating > 3 ? (
                                        <Fragment>
                                            <input type="radio" name="rate" id="rate4"/><label htmlFor="rate4"></label>
                                        </Fragment>
                                    ) : null}
                                    {review?.attributes?.rating > 4 ? (
                                        <Fragment>
                                            <input type="radio" name="rate" id="rate5"/><label htmlFor="rate5"></label>
                                        </Fragment>
                                    ) : null}
                                </div>
                                <h6>{new Date(review?.attributes?.createdAt).toLocaleDateString()}</h6>
                                <h5>{review?.attributes?.review}</h5>
                                {/*<div className='icon_company'>*/}
                                {/*    <button type="button" className='icon_comapny_btn'>*/}
                                {/*        <i className='AiFillLike'><AiFillLike/></i>*/}
                                {/*    </button>*/}
                                {/*    <button type="button" className='icon_comapny_btn'>*/}
                                {/*        <i className='AiFillDislike'><AiFillDislike/></i>*/}
                                {/*    </button>*/}
                                {/*    <button type="button" className='icon_comapny_btn'>*/}
                                {/*        <i className='FaShareAlt'><FaShareAlt/></i>*/}
                                {/*    </button>*/}
                                {/*    <button type="button" className='icon_comapny_btn'>*/}
                                {/*        <i className='BsFlagFill'><BsFlagFill/></i>*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Aarong
