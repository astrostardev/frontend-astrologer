import "../Stylesheets/Home.css"
import slideshow1 from "../assests/Slideshow.png"
import Services from "../components/Services";

function Home() {
    return (
        <>
            <main id="home">
                {/* <section className="hero">
                <img src={slideshow1} alt="astrologer" />
                <div className="desc">
                    <h2>Welcome to</h2>
                    <h1>Astromind</h1>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                    <button className="loginBtn px-1 my-4" style={{fontWeight:"bolder"}}>Login</button>
                </div>
            </section> */}
                <div id="carouselExampleIndicators" className="carousel slide carousel-fade" >
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active hero ">
                            <img src={slideshow1} className="d-block w-100" alt="..." />
                            <div className=" carousel-caption desc">
                                <h2>Welcome to</h2>
                                <h1>Astromind</h1>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                                <button className="heroBtn my-4" style={{ fontWeight: "bolder" }}>Login</button>
                            </div>
                        </div>
                        <div className="carousel-item hero">
                            <img src={slideshow1} className="d-block w-100" alt="..." />
                            <div className="carousel-caption desc">
                                <h2>Welcome to</h2>
                                <h1>GeoAstro</h1>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                                <button className="heroBtn my-4" style={{ fontWeight: "bolder" }}>Signup as Astrologer</button>
                            </div>
                        </div>
                        <div className="carousel-item hero">
                            <img src={slideshow1} className="d-block w-100" alt="..." />
                            <div className=" carousel-caption desc">
                                <h2>Welcome to</h2>
                                <h1>Zodiac</h1>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                                <button className="heroBtn my-4" style={{ fontWeight: "bolder" }}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="features">
                    <div className="featureContainer">
                        <div className="chat">
                            <h4>Chat</h4>
                            <p>Lorem Ipsum is not simply random text. It has roots in a piece of classical</p>
                        </div>
                        <div className="call">
                            <h4>Call</h4>
                            <p>Lorem Ipsum is not simply random text. It has roots in a piece of classical</p>
                        </div>
                        <div className="blog" >
                            <h4>Blog</h4>
                            <p>Lorem Ipsum is not simply random text. It has roots in a piece of classical</p>
                        </div>

                    </div>
                </section>
            </main>
            <Services />
        </>

    )
}


export default Home