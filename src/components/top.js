import "../Stylesheets/Top.css"
import benefitsAstro from "../assests/benefits-astro.png";
import benefitsUser from "../assests/benefits-user.png"
import Slider from "react-slick";
import AliceCarousel from 'react-alice-carousel';



function TopAstro() {
    const items = [
        <div className="card card-custom">
            <img src={benefitsUser} className="card-img-top" alt="..." style={{ height: "150px", width: "150px" }} />
            <div className="card-body">
                <h4>Devaraj R</h4>
                <p className="astro-desc">Vedic Astrologer</p>
                <p className="astro-desc">15yrs of Experience</p>
            </div>
        </div>,
        <div className="card card-custom">
            <img src={benefitsAstro} className="card-img-top" alt="..." style={{ height: "150px", width: "150px" }} />
            <div className="card-body">
                <h4>Ravi</h4>
                <p className="astro-desc">Astrologer</p>
                <p className="astro-desc">5yrs of Experience</p>
            </div>
        </div>,
        <div className="card card-custom">
            <img src={benefitsUser} className="card-img-top" alt="..." style={{ height: "150px", width: "150px" }} />
            <div className="card-body">
                <h4>Somu</h4>
                <p className="astro-desc">Vedic Astrologer</p>
                <p className="astro-desc">1yrs of Experience</p>
            </div>
        </div>,
        <div className="card card-custom">
            <img src={benefitsAstro} className="card-img-top" alt="..." style={{ height: "150px", width: "150px" }} />
            <div className="card-body">
                <h4>Vignesh</h4>
                <p className="astro-desc">Astrologer</p>
                <p className="astro-desc">5yrs of Experience</p>
            </div>
        </div>,
        <div className="card card-custom">
            <img src={benefitsUser} className="card-img-top" alt="..." style={{ height: "150px", width: "150px" }} />
            <div className="card-body">
                <h4>Murugan</h4>
                <p className="astro-desc">Astrologer</p>
                <p className="astro-desc">2yrs of Experience</p>
            </div>
        </div>,
        <div className="card card-custom">
            <img src={benefitsUser} className="card-img-top" alt="..." style={{ height: "150px", width: "150px" }} />
            <div className="card-body">
                <h4>Guru</h4>
                <p className="astro-desc">Vedic Astrologer</p>
                <p className="astro-desc">10yrs of Experience</p>
            </div>
        </div>,
    ]
    const responsive = {
        0: {
            items: 1
        },
        550: {
            items: 2
        },
        650: {
            items: 3
        },
        900: {
            items: 4
        },
        1250: {
            items: 5
        },
    }
    return (
        <div id="top">
            <div className="top-container">
                <h2 className="fw-bold" style={{ textAlign: "center" }}>Top Astrologers</h2>
                <div className="astro-carousel">
                    <AliceCarousel mouseTracking infinite animationDuration={1500} disableButtonsControls responsive={responsive}
                        items={items} />
                </div>
            </div>
        </div>
    )
}

export default TopAstro