import React, {useEffect, useState} from 'react'
import "./Review.css";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {baseUrl, token} from "../config/constants";
import {toast} from "react-toastify";

const Review = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const {id, reviewId} = useParams();
    const navigate = useNavigate();

    const [store, setStore] = useState(null);
    const [review, setReview] = useState(null);
    const [rating, setRating] = useState({
        rating: 1,
        review: "",
        store: [id],
        customer: [user?.id ? user.id.toString() : 1]
    })

    useEffect(() => {
        axios.get(`${baseUrl}/api/stores/${id}?populate=*`).then((res) => {
            if (res?.data?.data?.id) setStore(res.data.data)
        })
    }, [id])

    useEffect(() => {
        axios.get(`${baseUrl}/api/reviews/${reviewId}?populate=*`).then((res) => {
            if (res?.data?.data?.id) {
                setReview(res.data.data)
                setRating({
                    ...rating,
                    rating: res.data.data.attributes.rating,
                    review: res.data.data.attributes.review
                })
            }
        })
    }, [reviewId])

    const handleSubmit = () => {
        if (reviewId) {
            axios.put(
                `${baseUrl}/api/reviews/${reviewId}`,
                {
                    "data": rating
                }
            ).then((res) => {
                if (res?.data?.data?.id) {
                    axios.put(
                        `${baseUrl}/api/stores/${id}`,
                        {
                            data: {
                                rating: store?.attributes?.rating ? (store.attributes.rating - review.attributes.rating) + rating.rating : rating.rating,
                                // reviews: store?.attributes?.reviews ? store.attributes.reviews + 1 : 1
                            }
                        }
                    ).then((res) => {
                        toast("Successful");
                        navigate(`/profile`)
                    })
                }
            })
        } else {
            axios.post(
                `${baseUrl}/api/reviews`,
                {
                    "data": rating
                }
            ).then((res) => {
                if (res?.data?.data?.id) {
                    axios.put(
                        `${baseUrl}/api/stores/${id}`,
                        {
                            data: {
                                rating: store?.attributes?.rating ? store.attributes.rating + rating.rating : rating.rating,
                                reviews: store?.attributes?.reviews ? store.attributes.reviews + 1 : 1
                            }
                        }
                    ).then((res) => {
                        // toast("Successful");
                        navigate(`/store/${id}`)
                    })
                }
            })
        }
    }

    // const deleteReview = () => {
    //     axios.delete(
    //         `${baseUrl}/api/reviews/${reviewId}`
    //     ).then((res) => {
    //         if (res?.data) {
    //             axios.put(
    //                 `${baseUrl}/api/stores/${id}`,
    //                 {
    //                     data: {
    //                         rating: store?.attributes?.rating ? (store.attributes.rating - review.attributes.rating) : rating.rating,
    //                         reviews: store?.attributes?.reviews ? store.attributes.reviews - 1 : 1
    //                     }
    //                 }
    //             ).then((res) => {
    //                 toast("Successful");
    //                 navigate(`/profile`)
    //             })
    //         }
    //     })
    // }

    return (
        <div>
            <div className='header_review'>
                <img src={`${baseUrl}${store?.attributes?.photo?.data?.length ? store?.attributes?.photo?.data[0]?.attributes?.url : ""}`} height="110px" width="110px" alt=''/> 
                <h1>{store?.attributes?.title}</h1>
            </div>
            <div className='flex-container_review'>
                <div className='flex-box_review'>
                    <h4>Rate your experience</h4>
                    <div className='rating_review'>
                        <input
                            type="radio"
                            name="rate"
                            id="rate1"
                            checked={rating.rating === 5}
                            onClick={() => setRating({...rating, rating: 5})}
                        />
                        <label for="rate1"></label>

                        <input
                            type="radio"
                            name="rate"
                            id="rate2"
                            checked={rating.rating === 4}
                            onClick={() => setRating({...rating, rating: 4})}
                        />
                        <label for="rate2"></label>

                        <input
                            type="radio"
                            name="rate"
                            id="rate3"
                            checked={rating.rating === 3}
                            onClick={() => setRating({...rating, rating: 3})}
                        />
                        <label for="rate3"></label>

                        <input
                            type="radio"
                            name="rate"
                            id="rate4"
                            checked={rating.rating === 2}
                            onClick={() => setRating({...rating, rating: 2})}
                        />
                        <label for="rate4"></label>

                        <input
                            type="radio"
                            name="rate"
                            id="rate5"
                            checked={rating.rating === 1}
                            onClick={() => setRating({...rating, rating: 1})}
                        />
                        <label for="rate5"></label>
                    </div>
                    <br/>
                    <h4>Tell us about your experience</h4>
                    <div className='comment_review'>
                        <textarea
                            value={rating.review}
                            onChange={(event) => setRating({...rating, review: event.target.value})}
                        />
                    </div>
                    <div className='review_btn'>
                       <button onClick={handleSubmit} className='submit-btn'>SUBMIT</button>
                       {/* <button className='delete-btn' type="button" onClick={deleteReview}>DELETE</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review
