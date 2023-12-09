import "../Stylesheets/Footer.css"
import footerLogo from "../assests/footer-logo.png"
import appstore from "../assests/appstore.png"
import googleplay from "../assests/googleplay.png"
import fb from "../assests/fb.png"
import instagram from "../assests/instagram.png"
import telegram from "../assests/telegram.png"
import {FaRegCopyright} from "react-icons/fa"

function Footer() {
    return (
        <>
            <main id="footer">
                <section id="footer-items" >
                    <article id="address">
                        <img src={footerLogo} className="mb-3" />
                        <p>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
                        <h4 className="mt-4">Download our Application on</h4>
                        <div style={{ display: "flex", gap: "20px" }} className="mt-4">
                            <img src={appstore} />
                            <img src={googleplay} />
                        </div>
                    </article>
                    <article id="menu-links">
                        <div className="linkHeader">
                            <h4 className="fw-bolder">Product</h4>
                            <a href="#">Astromind for Android</a>
                            <a href="#">Astromind for iOS</a>
                            <a href="#">Astromind for Web</a>
                            <a href="#">Astromind School</a>
                            <a href="#">Astro Mall</a>
                        </div>
                        <div className="linkHeader">
                            <h4 className="fw-bolder">Quick Link</h4>
                            <a href="#">Astromall</a>
                            <a href="#">Chat with Astrologer</a>
                            <a href="#">Call with Astrologer</a>
                            <a href="#">Astrology Constellations</a>
                            <a href="#">Astro Blog</a>
                            <a href="#">Child Astrology</a>
                        </div>
                        <div className="linkHeader">
                            <h4 className="fw-bolder">Corporate Info</h4>
                            <a href="#">Terms and Conditions</a>
                            <a href="#">About Us</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Disclaimer</a>
                            <a href="#">Pricing Policy</a>
                            <a href="#">Refund and Cancelation</a>
                        </div>
                    </article>
                </section>
                <section id="socialMedia-icons">
                    <img src={fb} className="me-2" alt="facebook" />
                    <img src={instagram} className="me-2" alt="instagram" />
                    <img src={telegram} className="me-2" alt="telegram" />
                    <p className="mt-2" style={{fontSize:"12px"}}><FaRegCopyright /> 2023 All rights reserved</p>
                </section>
            </main>
        </>
    )
}


export default Footer