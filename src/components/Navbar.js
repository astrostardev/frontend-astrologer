import { Link, Navigate } from "react-router-dom"
import logo from "../assests/Logo.png"
import "../Stylesheets/Navbar.css"


function Navbar() {

    

    return (
        <>
            <nav className="navbar navbar-custom navbar-expand-lg ">
                <div className="container-fluid">
                    <img src={logo} alt="navLogo" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Astro</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item me-3">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item me-3">
                                    <a className="nav-link" href="#services">Services</a>
                                </li>
                                <li className="nav-item me-3">
                                    <a className="nav-link" href="#about">About Us</a>
                                </li>
                                <li className="nav-item me-3">
                                    <a className="nav-link" href="#contact">Contact Us</a>
                                </li>
                                <li className="nav-item">
                                    <button className="loginBtn px-1"><Link to="/astrologer-login" style={{textDecoration: "none", color:"initial"}}>Login</Link></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>

    )

}


export default Navbar