import "../Stylesheets/Profile.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Offcanvas from "../components/Offcanvas";


function Profile() {
  const [disable, setDisabled] = useState(true);

  function editData() {
    setDisabled(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
  }
  return (
    <>
      <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <Offcanvas />
      </div>
      <div className="infoContainer">
        <h4>Your Profile</h4>
        <div
          style={{
            height: "3px",
            width: "50px",
            backgroundColor: "#EE721B",
            borderRadius: "10px",
            marginTop: "3px",
          }}
        ></div>
        <main>
          <section id="astroProfile">
            <Form className="astroForm">
              <div className="my-4">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Firstname"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="firstname"
                    defaultValue="Raghav"
                    name="firstname"
                    disabled={disable}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Lastname"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="lastname"
                    defaultValue="Swami"
                    name="lastname"
                    disabled={disable}
                  />
                </FloatingLabel>
              </div>
              <div className="my-4">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="email"
                    placeholder="email"
                    name="email"
                    defaultValue="raghavswami@gmail.com"
                    disabled={disable}
                  />
                </FloatingLabel>
                <Form.Label>
                  Mobile number
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue="+919876543210"
                  />
                </Form.Label>
              </div>
              <div className="my-4">
                <div className="ms-2">
                  <Form.Label className="me-3" style={{ display: "block" }}>
                    Select Gender
                  </Form.Label>
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="gender"
                    inline
                    id="inline-radio-1"
                    defaultChecked
                    disabled={disable}
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    inline
                    id="inline-radio-2"
                    disabled={disable}
                  />
                  <Form.Check
                    type="radio"
                    label="Others"
                    name="gender"
                    inline
                    id="inline-radio-3"
                    disabled={disable}
                  />
                </div>
                <FloatingLabel
                  controlId="floatingInput"
                  label="City"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="city"
                    defaultValue="Chennai"
                    name="city"
                    disabled={disable}
                  />
                </FloatingLabel>
              </div>
              <FloatingLabel controlId="floatingTextarea2" label="Bio">
                <Form.Control
                  as="textarea"
                  placeholder="Bio"
                  defaultValue="Vedic Astrologer"
                  style={{ height: "100px" }}
                  disabled={disable}
                />
              </FloatingLabel>
              <article className="my-3 profileBtn">
                <Button variant="warning" className="me-3" onClick={editData}>
                  Edit
                </Button>
                <Button
                  type="submit"
                  style={{ backgroundColor: "#EE721B", border: "transparent" }}
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </Button>
              </article>
            </Form>
          </section>
        </main>
      </div>
    </>
  );
}

export default Profile;
