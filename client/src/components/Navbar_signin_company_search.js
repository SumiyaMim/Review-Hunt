import React, { useEffect, useState } from 'react';
import './Navbar_signin_company_search.css';
import userBlue from '../components/userBlue.png';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../config/constants';
import { TfiMenu } from 'react-icons/tfi';

const Navbar_signin_company_search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false); // State to control menu visibility

  const [user, setUser] = useState({
    name: '',
    email: '',
    type: '',
    photo: [],
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) setUser(user.attributes);
  }, []);

  const renderCategories = () => (
    <Link to="/Category" className="items_signin_company_search">
      <li>Categories</li>
    </Link>
  );

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  const renderUserContent = () => {
    if (user?.name) {
      return (
        <div className="user_company_search">
          {renderUserImage()}
          <div
            className={`dropdown_company_search ${showMenu ? 'show' : ''}`}
            onClick={handleDropdownClick}
          >
            <button className="dropbtn_company_search">{user.name}</button>
            <div className="dropdown_content_company_search">
              {user.type === 'personal' && (
                <Link to="/profile">
                  <li>My Profile</li>
                </Link>
              )}
              {user.type === 'business' && (
                <>
                  {/* <Link to="/Company_Profile"> */}
                  <Link to="/profile">
                    <li>My Profile</li>
                  </Link>
                  <Link to="/Add_Store">
                    <li>Add Store</li>
                  </Link>
                </>
              )}
              <Link to="/" onClick={handleSignOut}>
                <li>Sign out</li>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="user_company_search">
          <button className="dropbtn_company_search" onClick={() => navigate('signin')}>
            Sign in
          </button>
        </div>
      );
    }
  };

  const handleSignOut = (e) => {
    e.preventDefault()
    localStorage.removeItem('user');
    navigate('/');
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const renderUserImage = () => {
    if (user?.photo?.data?.attributes?.url) {
      return (
        <img
          height={36}
          width={38}
          src={`${baseUrl}${user.photo?.data?.attributes?.url}`}
          alt=""
        />
      );
    } else {
      return <img height={38} width={40} src={userBlue} alt="" />;
    }
  };

  return (
    <div className="nav_signin_company_search">
      <label className="nav_logo_signin_company_search">Review Hunt</label>
      <label onClick={toggleMenu}>
        <i className="menu">
          <TfiMenu />
        </i>
      </label>
      <ul className={`nav_items_signin_company_search ${showMenu ? 'show' : ''}`}>
        {renderCategories()}
        {renderUserContent()}
      </ul>
      <div className="search_on_nav_company">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search/${search}`);
          }}
        >
          <i className="fas fa-search"></i>
          <input
            type="text1"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a store or category..."
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Navbar_signin_company_search;
