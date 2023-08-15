import React, { Fragment, useEffect, useState } from 'react';
import './Profile.css';
import userBlue from '../user/userBlue.png';
import { useNavigate, Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import { baseUrl } from '../../config/constants';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    type: '',
    photo: [],
    id: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) setUser({ ...user.attributes, id: user.id });
  }, []);

  const [reviews, setReviews] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    if (user.id) {
      axios
        .get(`${baseUrl}/api/reviews?populate[0]=*&populate[1]=customer.photo&populate[2]=store.title&filters[customer][id]=${user.id}`)
        .then((res) => {
          if (res?.data?.data?.length) {
            setReviews(res.data.data);
          }
        });

      axios
        .get(`${baseUrl}/api/stores?populate=*&filters[customer][id]=${user.id}`)
        .then((res) => {
          if (res?.data?.data?.length) setStores(res.data.data);
        });
    }
  }, [user.id]);

  return (
    <div className='profile'>
      <div className='header_profile'>
        <div className='circle'>
          <span className='circle1'></span>
          <div className='content'>
            {user.photo?.data?.attributes?.url ? (
              <img src={`${baseUrl}${user.photo?.data?.attributes?.url}`} height='100px' width='100px' alt='' />
            ) : (
              <img src={userBlue} height='100px' width='100px' alt='' />
            )}
          </div>
          <h1>{user.name}</h1>
          <h2>{reviews.length}</h2>
          <br></br>
          <h3>Reviews written by you</h3>
        </div>
        <div className='edit'>
          <button type='button' class='edit-btn' onClick={() => navigate('/Edit_profile')}>
            <li className='icon_edit'>
              <FaEdit />
              &nbsp;Edit Profile
            </li>
          </button>
        </div>
      </div>
      <div className='container_profile'>
      {user.type === 'business' && (
  <div>
    <h2>Stores</h2>
    {stores.length === 0 ? (
      <p>No store has been added yet!</p>
    ) : (
      <div className='stores'>
        {stores.map((store, idx) => (
          <div key={idx}>
            <Link to={`/store/${store.id}`}>
              <div className='store_btn'>
                <div className='store_name'>{store.attributes.title}</div>
                {/* <div>{store.attributes.description}</div> */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    )}
  </div>
)}

        <div className='find_company'>
          <h3>Write your review</h3>
          <button class='company-btn' onClick={() => navigate('/Category')}>
            Find a Company
          </button>
        </div>
        {reviews.map((review, ri) => (
          <div className='flex-container_profile' key={ri}>
            <div className='flex-box_profile'>
              <div className='flex-box1_profile'>
                <img
                  src={`${baseUrl}${review?.attributes?.customer?.data?.attributes?.photo?.data?.attributes?.url}`}
                  height='41px'
                  width='43px'
                />
                <h4>{review?.attributes?.customer?.data?.attributes?.name}</h4>
                <hr></hr>
                <div className='rating_user'>
                  {review?.attributes?.rating > 0 ? (
                    <Fragment>
                      <input type='radio' name='rate' id='rate1' />
                      <label htmlFor='rate1'></label>
                    </Fragment>
                  ) : null}
                  {review?.attributes?.rating > 1 ? (
                    <Fragment>
                      <input type='radio' name='rate' id='rate2' />
                      <label htmlFor='rate2'></label>
                    </Fragment>
                  ) : null}
                  {review?.attributes?.rating > 2 ? (
                    <Fragment>
                      <input type='radio' name='rate' id='rate3' />
                      <label htmlFor='rate3'></label>
                    </Fragment>
                  ) : null}
                  {review?.attributes?.rating > 3 ? (
                    <Fragment>
                      <input type='radio' name='rate' id='rate4' />
                      <label htmlFor='rate4'></label>
                    </Fragment>
                  ) : null}
                  {review?.attributes?.rating > 4 ? (
                    <Fragment>
                      <input type='radio' name='rate' id='rate5' />
                      <label htmlFor='rate5'></label>
                    </Fragment>
                  ) : null}
                </div>
                <h6>{new Date(review?.attributes?.createdAt).toLocaleDateString()}</h6>
                <h5>{review?.attributes?.review}</h5>
                <hr></hr>
                <div className='icon_profile'>
                  <button
                    type='button'
                    className='btns'
                    onClick={() => navigate(`/update/${review?.attributes?.store?.data?.id}/${review.id}`)}
                  >
                    <i className='icon_profile'>
                      <MdEdit />
                      &nbsp;Edit
                    </i>
                  </button>
                </div>
                <div className='link_profile'>
                  <p>
                    Review of <a href={review?.attributes?.store?.data?.attributes?.website}>{review?.attributes?.store?.data?.attributes?.title}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
