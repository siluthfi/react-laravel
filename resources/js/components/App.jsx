import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import Navbar from "./templates/Navbar";
import Login from "./auth/Login";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import Posts from "./Posts";

const App = () => {
    const d = new Date();
    const isLogged = localStorage.getItem("isLogged");
    const user = localStorage.getItem("user");
    const expires = localStorage.getItem("expires");
    console.log(expires)
    console.log(user)
    if(expires) {
        if(expires < d.getTime()) {
            localStorage.clear();
        }
    }
    return (
        <>
            <BrowserRouter>
                <Navbar check={isLogged} />
                <Routes>
                    { isLogged ? (
                        <>
                            {/* authorization */}
                            <Route path="/" element={<Navigate to='/login' />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/posts" element={<Posts />} />

                            <Route path="/login" element={<Navigate to="/home" />} />
                        </>
                    ) : (
                        <>
                            {/* authentication route */}
                            <Route path="/*" element={<Navigate to="/login" />} />
                            <Route path="/login" element={<Login />} />
                        </>
                    ) }

                </Routes>
            </BrowserRouter>
        </>
    );
}
 
export default App;