import React from "react";
import "./astroProfile.css";
import astro2 from "../../../assests/astro1.svg";
function AstrologerProfile(props) {
  const toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
  };
  return (
    <div className="main__userprofile">
      <div class="profile__card user__profile__image">
        {/* <div className="bg_img">
                <img src={bgImage} alt="" />
              </div> */}
        <div
          className="container-fluid"
          id="circle_img"
          style={{ marginTop: "3rem" }}
        >
          <img src={astro2} alt="" style={{ Width: "150px" }} />
        </div>

        <div className="about_user" style={{ marginTop: "1rem" }}>
          <h3 style={{ fontSize: "24px" }}>mike andrew</h3>
          <p style={{ fontSize: "17px" }}>Michael24</p>
          <p className="des_user" style={{ fontSize: "17px" }}>
            "Lamborghini Mercy <br /> Your chick she so thirsty <br /> I'm in
            that two seat Lambo"
          </p>
          <hr className="ruler" />
        </div>

        <div className="social_icon">
          <div>
            <i class="fa-brands fa-square-facebook"></i>
          </div>
          <div>
            <i class="fa-brands fa-square-twitter"></i>
          </div>
          <div>
            <i class="fa-brands fa-square-google-plus"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AstrologerProfile;
