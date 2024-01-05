import loginStar from "../assests/a2.jpg";
import "../Stylesheets/Login.css";
import logo from "../assests/qq.jpg";
import icons from "../assests/icons.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { login } from "../actions/astrologerAction";
import { useEffect, useState } from "react";
import {
  Form,
  Button,
  Toast,
  Alert,
  ToastContainer,
  FloatingLabel,
  InputGroup,
} from "react-bootstrap";
import OtpInput from "react-otp-input";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function AstrologerLogin() {
  const navigate = useNavigate();
  const [showTab, setShowtab] = useState(1);
  const dispatch = useDispatch()
  const {astrologer =[]} = useSelector(state=>state.astroState)

  const[submit,setSubmit] = useState(false);
  const handleClick = (num) => {
    setShowtab(num);
  };

  // const [width, setWidth] = useState(window.innerWidth)

  // function closeSide() {
  //     let logoImg = document.querySelector("#logoImg")
  //     logoImg.classList.add("close")
  //     logoImg.classList.remove("loginImgContainer")
  // }

  // function openSide() {
  //     let logoImg = document.querySelector("#logoImg")
  //     logoImg.classList.remove("close")
  //     logoImg.classList.add("loginImgContainer")
  // }
  // function detectWidth() {
  //     setWidth(window.innerWidth)
  //     console.log(width);
  //     if (width < 700) {
  //         closeSide()
  //     } else {
  //         openSide()
  //     }
  // }
  // useEffect(() => {
  //     window.addEventListener('resize', detectWidth)

  //     return () => {
  //         window.removeEventListener('resize', detectWidth)
  //     }
  // }, [width])

  //step-1
  const [phoneNumber, setPhoneNumber] = useState("");
  const [astrologers, setAstrologers] = useState();
  const [valid, setValid] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleChange = (value) => {
    setAlert(false);
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };
  let mobile = phoneNumber.replace(/\D/g, "");
  const mobileNo = mobile.slice(2);

  
  const validatePhoneNumber = (mob) => {
    const removeCountryCode = mob.substr(2);
    const phoneNumberPattern = /^[6-9]\d{9}$/;
    return phoneNumberPattern.test(removeCountryCode);
  };

  function handleOTP() {
    if (valid) {
      setSeconds(45);
      setMinutes(0);
      setAlert(false);
      // handleClick(2);
    } else {
      setAlert(true);
    }
  }



// Assuming astrologers and mobileNo are defined in the surrounding scope
const submitHandler = async () => {
  try {
    const response = await dispatch(login(mobileNo));
    // Access the response data here
    console.log('Response:', response);
    setAstrologers(response)
    console.log('astro', astrologers);
  } catch (error) {
    // Handle error
    console.error('Login failed:', error);
  }
};
// useEffect(()=>{
//   console.log('astrologers',astrologers);
  
//   },[astrologers])

  const checkAstrologer = () => {

    if(astrologer[0]?.isActive == 'false'){
      window.alert("astrologer can't login please contact admin");
         
    }
    if (astrologers) {
        const dbMobile =  astrologers?.astrologer[0]?.mobilePrimary;
      console.log('dbMobileNo', dbMobile);
  
      // Check if dbMobile is defined before using it
      if (dbMobile !== undefined) {
        if (mobileNo === dbMobile) {
          handleClick(2);
          console.log("true");
        } else {
          window.alert("Astrologer not found in this mobile no");
        }
      } else {
        window.alert("Astrologer not found in this mobile no");
      }
    } else {
      console.log('Astrologers state not defined yet');
    }

  };

 useEffect(()=>{
   const timeoutId = setTimeout(checkAstrologer, 1000);
    // Clear the timeout on component unmount or when dependencies change
    return () => clearTimeout(timeoutId);

 },[astrologers])



  //step-2
  function handleBack() {
    handleClick(1);
  }

  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [otpAlert, setOtpalert] = useState(false);
  useEffect(() => {
    const interval = setInterval(function () {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = () => {
    setMinutes(1);
    setSeconds(30);
  };

  function handleVerify() {
    if (otp == "123456") {
      setOtpalert(false);
      handleClick(3);
      navigate("/dashboard");
    } else {
      setOtpalert(true);
    }
  }

  //step-3
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const validation = {
    username: {
      required: {
        value: true,
        message: "Fill the details",
      },
    },
  };
  return (
    <div id="login">
      <div className="loginContainer">
        <img src={logo} alt="navLogo" />
        <p>
        Contribute to Society with your service
        </p>
        <div className={showTab === 1 ? "active" : "disable"}>
          <Form className="mt-4" id="form">
            <Form.Group controlId="formFile" className="mb-3 me-3">
              <Form.Label>Enter your mobile number:</Form.Label>
              <PhoneInput
                country={"in"}
                value={phoneNumber}
                onChange={handleChange}
                inputProps={{
                  name: "mobile",
                  required: true,
                }}
                countryCodeEditable={false}
                onlyCountries={["in"]}
                disableDropdown={true}
              />
            </Form.Group>

            <Button
              disabled={submit}
              onClick={async (e) => {
              e.preventDefault();
              submitHandler()
              checkAstrologer();
              handleOTP();
              
            }}
              className="otpBtn"
            >
              Get OTP
            </Button>
          </Form>
          {alert && (
            <ToastContainer
              position="top-end"
              className="p-3"
              style={{ zIndex: 1 }}
            >
              <Toast
                className="d-inline-block m-1"
                bg="danger"
                delay={3000}
                autohide={true}
              >
                <Toast.Body className="dark">
                  Enter valid mobile number
                </Toast.Body>
              </Toast>
            </ToastContainer>
          )}
          <p className="terms">
            By signing up, you agree to our <a href="#">Terms of use</a> and{" "}
            <a href="#">Privacy policy</a>
          </p>
        </div>
        <div className={showTab === 2 ? "active" : "disable"}>
          <Form className="mt-4" id="form">
            <Form.Group controlId="formFile" className="mb-3 me-3">
              <Form.Label>Enter your mobile number:</Form.Label>
              <PhoneInput
                country={"in"}
                value={phoneNumber}
                onChange={handleChange}
                inputProps={{
                  required: true,
                }}
                countryCodeEditable={false}
                onlyCountries={["in"]}
                disableDropdown={true}
                disabled={true}
              />
            </Form.Group>
            <Button onClick={handleBack} className="otpBtn">
              Edit
            </Button>
          </Form>

          {/* OTP input */}
          <div className="inputOtp mt-4">
            <form
              onSubmit={handleSubmit((data, e) => {
                e.preventDefault();
                navigate("/dashboard");
              })}
            >
              <p className="fs-6 mb-2">
                You will receive 6 digits code for verification
              </p>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="me-2"></span>}
                renderInput={(props) => <input {...props} className="otpBox" />}
              />
              <div className="countdown-text">
                {seconds > 0 || minutes > 0 ? (
                  <p>
                    Time remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                ) : (
                  <p> Didn't receive the OTP </p>
                )}
                <button
                  disabled={seconds > 0 || minutes > 0}
                  style={{
                    color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                  }}
                  onClick={resendOTP}
                >
                  Resend OTP
                </button>
              </div>
              <Button onClick={handleVerify} type="submit">
                Verify
              </Button>
              {otpAlert && (
                <ToastContainer
                  position="top-end"
                  className="p-3"
                  style={{ zIndex: 1 }}
                >
                  <Toast
                    className="d-inline-block m-1"
                    bg="danger"
                    delay={3000}
                    autohide={true}
                  >
                    <Toast.Body className="dark">Invalid OTP</Toast.Body>
                  </Toast>
                </ToastContainer>
              )}
              <p className="terms">
                By signing up, you agree to our <a href="#">Terms of use</a> and{" "}
                <a href="#">Privacy policy</a>
              </p>
            </form>
          </div>
        </div>
        {/* <div className={showTab === 3 ? "active" : "disable"}>
                  
                        <div className="mb-3 me-3">
                            <label htmlFor="username" className="form-label">Enter Username</label>
                            <input type="text" className="form-control" id="username" placeholder="Username" name="username"   {...register("username", validation.username)} />
                        </div>
                       <Button type="submit" className="otpBtn ">Submit</Button>
                  
                    <p className="errormsg">
                        {errors.username && errors.username.message}
                    </p>
                    <div className="conditions">
                        <h4 style={{ color: "#EE721B" }}>Terms and Conditions</h4>
                        <p>
                            Duis et ligula id felis gravida vulputate. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus lacinia vestibulum gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum lacinia lobortis urna eget mattis. Nullam vestibulum vestibulum neque ac efficitur. Nunc vitae tellus leo. Maecenas condimentum eros metus, id ornare erat porttitor vitae  vestibulum neque ac efficitur. Nunc vitae tellus leo. Maecenas condimentum eros metus, id ornare erat porttitor vitae.
                            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus lacinia vestibulum gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum lacinia lobortis urna eget mattis. Nullam vestibulum vestibulum neque ac efficitur. Nunc vitae tellus leo. Maecenas condimentum eros metus, id ornare erat porttitor vitae  vestibulum neque ac efficitur.
                        </p>
                    </div>
                </div> */}
      </div>

      <div id="logoImg" className="loginImgContainer">
        {/* <img src={icons} alt="icons" className="iocns" /> */}
        <img src={loginStar} alt="star" className="logoStar" />
      </div>
    </div>
  );
}

export default AstrologerLogin;
