import AboutImg from "../assests/About.jpg"
import "../Stylesheets/About.css"
import Contact from "./Contact"
import benefitsUser from "../assests/benefits-user.png"
import benefitsAstro from "../assests/benefits-astro.png";
import Slider from "react-slick";
import TopAstro from "./top";
import { Link } from "react-router-dom";


function About() {

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <div id="about">
                {/* About Us */}
                <div className="aboutUs">
                    <h2 className="fw-bold">About Us</h2>
                    <img src={AboutImg} alt="aboutImg" className="imgContainer" />
                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,</p>
                </div>

                {/* Vision */}
                <div className="vision">
                    <div>
                        <h2 className="fw-bold">Vision and Mission</h2>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,</p>
                    </div>
                </div>
                {/* Top Astrologers */}
                <TopAstro />
                {/* Benefits */}
                <div className="benefits">
                    <div className="main">
                        <div className="benefitsContainer">
                            <div className="description">
                                <img src={benefitsUser} alt="benefits-user" />
                                <h5>Why do I need to be an Astromind Customer?</h5>
                                <button className="benefits-user">Login as Customer</button>
                            </div>
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
                        </div>
                        <div className="benefitsContainer">
                            <div className="description">
                                <img src={benefitsAstro} alt="benefits-astro" />
                                <h5>Why do I need to be an Astromind Astrologer?</h5>
                                <Link to='/astrologer-login'><button className="benefits-user">Login as Astrologer</button></Link>
                            </div>
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Contact />
        </>

    )
}


export default About