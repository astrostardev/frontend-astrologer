import React, { useState, useEffect } from "react";
import '../scssStyleSheet/astroProfile.scss'
// import astrologer from "../Assests/astrologer.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap"
import dayjs from 'dayjs';
import Sidebar from "../components/Sidebar";
import Offcanvas from "../components/Offcanvas";
import { useSelector } from "react-redux";
import MetaData from "./MetaData";
// import moment from "moment"

function ViewAstroProfile() {
    const [isLoading, setIsloading] = useState(false)
 
    const navigate = useNavigate()
    const {astrologer =[]} = useSelector(state=>state.astroState)


    return (
        <>
        <MetaData title={'Astro5Star-Contributor'} />

              <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <Offcanvas />
      </div>
        <div className="infoContainer">
            {isLoading ?
                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <Spinner animation="grow" className="text-center" variant="warning" />
                </div>
                :
                <main className="card profile_container">
                    <section className="viewProfile-head">
                        <div>
                            <h3>Profile</h3>
                            <div
                                style={{
                                    height: "3px",
                                    width: "40px",
                                    backgroundColor: "#FFCB11",
                                    borderRadius: "10px",
                                    marginTop: "3px",
                                }}
                            ></div>
                        </div>
                        <div className="btnGroup">
                            <button className="btns" onClick={() => navigate(`/editastrologer/${astrologer[0]?._id}`)} disabled={isLoading}>Edit</button>
                            <Button variant="danger" >Delete</Button>
                        </div>
                    </section>
                    <h3 style={{ textDecoration: "underline", marginBottom: "20px", marginTop: "20px" }}>
                        Basic Details
                    </h3>

                    <article className="profile_detail">
                        <div className="my-4">
                            <h5>Astrologer ID</h5>
                            <p>{astrologer[0]?.astrologerID}</p>
                        </div>
                        <div className="my-4">
                            <h5>isActive</h5>
                            <p>{astrologer[0]?.isActive == "Yes" ? "Yes" : "No"}</p>
                        </div>
                        <div className="my-4">
                            <h5>Firstname</h5>
                            <p>{astrologer[0]?.firstname}</p>
                        </div>

                        <div className="my-4">
                            <h5>Lastname</h5>
                            <p>{astrologer[0]?.lastname}</p>
                        </div>
                        <div className="my-4">
                            <h5>Date of Birth</h5>
                            <p>{dayjs(astrologer[0]?.dob).format('DD/MM/YYYY')}</p>
                        </div>
                        <div className="my-4">
                            <h5>Photo</h5>
                            <div className="img">
                                {/* <img src={astrologer[0]?.profilePic[0]?.pic} alt='' /> */}
                                {/* <img src={astrologer[0]?.profilePic[0].pic} alt="" /> */}
                            </div>
                        </div>
                        <div className="my-4">
                            <h5>Gender</h5>
                            <p>{astrologer[0]?.gender}</p>
                        </div>

                        <div className="my-4">
                            <h5>Email address</h5>
                            <p>{astrologer[0]?.email}</p>
                        </div>

                        <div className="my-4">
                            <h5>Primary Mobile No</h5>
                            <p>{astrologer[0]?.mobilePrimary}</p>
                        </div>

                        <div className="my-4">
                            <h5>Secondry Mobile No</h5>
                            <p>{astrologer[0]?.mobileSecondary}</p>
                        </div>

                        <div className="my-4">
                            <h5>Education Qualification</h5>
                            <p>{astrologer[0]?.qualifications}</p>
                        </div>

                        <div className="my-4">
                            <h5>Address</h5>
                            <p>{astrologer[0]?.address}</p>
                        </div>
                        <div className="my-4">
                            <h5>District</h5>
                            <p>{astrologer[0]?.district}</p>
                        </div>
                        <div className="my-4">
                            <h5>State</h5>
                            <p>{astrologer[0]?.state}</p>
                        </div>
                        <div className="my-4">
                            <h5>Country</h5>
                            <p>{astrologer[0]?.country}</p>
                        </div>
                        <div className="my-4">
                            <h5>Pincode</h5>
                            <p>{astrologer[0]?.pincode}</p>
                        </div>
                        <div className="my-4">
                            <h5>Chat</h5>
                            <p>{astrologer[0]?.chat}</p>
                        </div>
                        <div className="my-4">
                            <h5>Call</h5>
                            <p>{astrologer[0]?.call}</p>
                        </div>

                        <h3 style={{ textDecoration: "underline", marginBottom: "20px" }}>
                            Astrology Related Details
                        </h3>

                        <div className="my-4">
                            <h5>Astrology School Name / Guru Name</h5>
                            <p>{astrologer[0]?.institute}</p>
                        </div>
                        <div className="my-4">
                            <h5>Experience in Yrs</h5>
                            <p>{astrologer[0]?.experience}</p>
                        </div>

                        <div className="my-4">
                            <h5>Certificates</h5>
                            <div className="img">
                                {/* {astrologer[0]?.certificates.map((file) => (
                                    <img src={file.file} alt="" />
                                ))} */}



                            </div>
                        </div>
                        <div className="my-4">
                            <h5>What do you mean by astrology?</h5>
                            <p>
                                {astrologer[0]?.astrologyDescription}

                            </p>
                        </div>
                        <div className="my-4">
                            <h5>Describe about your experience you gained in astrology?</h5>
                            <p>
                                {astrologer[0]?.astrologyExperience}
                            </p>
                        </div>

                        <div className="my-4">
                            <h5>Describe about your individuality in astrology?</h5>
                            <p>
                                {astrologer[0]?.astrologyExpertise}
                            </p>
                        </div>

                        <div className="my-4">
                            <h5>How do you know about us?</h5>
                            <p>
                                {astrologer[0]?.knowus}
                            </p>
                        </div>

                        <div className="my-4">
                            <h5>Maximum time you can spent in Astro5Star per day(in Hrs)?</h5>
                            <p>
                                {astrologer[0]?.maxTime}

                            </p>
                        </div>

                    </article>

                    <div className="btnGroup">
                        <button className="btns" onClick={() => navigate(`/editastrologer/${astrologer[0]?._id}`)} disabled={isLoading}>Edit</button>
                        <Button variant="danger"  >Delete</Button>
                    </div>
                </main>
            }
        </div>
        </>
    );
}

export default ViewAstroProfile;