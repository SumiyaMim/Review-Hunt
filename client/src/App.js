import "./App.css";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Navbar_signin_company_search from "./components/Navbar_signin_company_search";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Category from "./pages/Category";
import Main_Store_list from "./pages/Main_Store_list";
import Aarong from "./pages/Aarong";
import Review from "./pages/Review";
import Update from "./pages/Update";
import Profile from "./pages/user/Profile";
import Edit_profile from "./pages/user/Edit_profile";
import Add_Store from "./pages/company/Add_Store";
import Footer from "./components/Footer";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Fragment} from "react";

function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <Navbar_signin_company_search/>
                <Routes>
                    <Route path="/signin"element={<Signin/>}></Route>
                    <Route path="/signup"element={<Signup/>}></Route>
                    <Route path="/" element={<Navigate to="/home" />}></Route> /* redirect to /home when user goes to / */
                    <Route path="/home"element={<Home/>}></Route>
                    <Route path="/search"element={<Search/>}></Route>
                    <Route path="/category"element={<Category/>}></Route>
                    <Route path="/category/:id"element={<Main_Store_list/>}></Route>
                    <Route path="/search/:id"element={<Search/>}></Route>
                    <Route path="/main_store_list"element={<Main_Store_list/>}></Route>
                    <Route path="/store/:id"element={<Aarong/>}></Route>
                    <Route path="/aarong"element={<Aarong/>}></Route>
                    <Route path="/review/:id"element={<Review/>}></Route>
                    <Route path="/review/:id/:reviewId"element={<Review/>}></Route>
                    <Route path="/update/:id/:reviewId"element={<Update/>}></Route>
                    <Route path="/profile"element={<Profile/>}></Route>
                    <Route path="/edit_profile"element={<Edit_profile/>}></Route>
                    <Route path="/add_store"element={<Add_Store/>}></Route>
                </Routes>
                <Footer/>
            </BrowserRouter>
            <ToastContainer />
        </Fragment>
    );
}

export default App;
