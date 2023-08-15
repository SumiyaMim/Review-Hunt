import React, {useState} from 'react'
import "./Home.css"
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("")
    return (
        <div className='container-home'>
            <div className='title'>
                <h1>SEARCH WHAT <br></br> YOU WANT TO REVIEW</h1><br></br>
                <div className='search'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/search/${search}`);
                    }}>
                        <i class="fas fa-search"></i>
                        <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search for a store or category..."></input>
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home     
