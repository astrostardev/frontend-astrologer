
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import slideshow1 from "../assests/Slideshow.png";
import "../Stylesheets/Services.css"
import benefitsAstro from "../assests/benefits-astro.png"
import benefitsUser from "../assests/benefits-user.png"
import About from './About';


function Services() {



    const items = [
        <div className="card card-custom">
            <img src={benefitsUser} className="card-img-top" alt="..." style={{ height: "150px", width: "150px" }} />
            <div className="card-body">
                <h4>Astro consultation</h4>
                <p className="card-text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.</p>
            </div>
        </div>,
        <div className="card card-custom">
            <img src={benefitsAstro} className="card-img-top" alt="..." style={{ height: "150px", width: "150px" }} />
            <div className="card-body">
                <h4>Astro Lessons</h4>
                <p className="card-text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.</p>
            </div>
        </div>,
        <div className="card card-custom">
            <img src={benefitsUser} className="card-img-top" alt="..." style={{ height: "150px", width: "150px" }} />
            <div className="card-body">
                <h4>Astro Mall</h4>
                <p className="card-text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.</p>
            </div>
        </div>,
        <div className="card card-custom">
            <img src={benefitsAstro} className="card-img-top" alt="..." style={{ height: "150px", width: "150px" }} />
            <div className="card-body">
                <h4>Horoscope</h4>
                <p className="card-text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.</p>
            </div>
        </div>,
        <div className="card card-custom">
            <img src={benefitsUser} className="card-img-top" alt="..." style={{ height: "150px", width: "150px" }} />
            <div className="card-body">
                <h4>Astrolorem</h4>
                <p className="card-text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.</p>
            </div>
        </div>,
        <div className="card card-custom">
            <img src={benefitsAstro} className="card-img-top" alt="..." style={{ height: "150px", width: "150px" }} />
            <div className="card-body">
                <h4>AstroIpsum</h4>
                <p className="card-text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.</p>
            </div>
        </div>
    ]

    const responsive = {
        0: {
            items: 1
        },
        550: {
            items: 1.5
        },
        650: {
            items: 2
        },
        850: {
            items: 3
        },
        1250: {
            items: 4
        },
    }
    return (
        <>
            <div id="services">
                <div className="service-container">
                    <h2 className="fw-bold" style={{ textAlign: "center" }}>Services</h2>
                    <div className="service-carousel">
                        <AliceCarousel mouseTracking infinite animationDuration={1500} disableButtonsControls responsive={responsive}
                            items={items} />
                    </div>
                </div>
            </div>
            <About />
        </>
    )
}


export default Services