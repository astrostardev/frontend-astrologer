import "../Stylesheets/Earnings.css";
import { earnings } from "../data";
import Table from "react-bootstrap/Table";
import Sidebar from "../components/Sidebar";
import Offcanvas from "../components/Offcanvas";
import MetaData from "./MetaData";
import { useSelector } from "react-redux";

function Earnings() {
  const { astrologer } = useSelector((state) => state.astroState);
 // Assuming astrologer is an array of objects where each object has a property 'chatDetails' which is an array of objects, and each of these objects has a property 'sameUser' which is an array of objects containing 'chatTime'.



  return (
    <>
      <MetaData title={"Astro5Star-Contributor"} />

      <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <Offcanvas />
      </div>
      <div className="infoContainer">
        <main id="earnings">
          <section className="earnHead">
            <div>
              <h4>Your Earnings</h4>
              <div
                style={{
                  height: "3px",
                  width: "75px",
                  backgroundColor: "#FFCB11",
                  borderRadius: "10px",
                  marginTop: "3px",
                }}
              ></div>
            </div>
            <select
              className="form-select form-select-sm mb-3 earnFilter"
              aria-label="Large select example"
            >
              <option defaultValue>Period</option>
              <option value="1">Yearly</option>
              <option value="187">Monthly</option>
              <option value="365">Daily</option>
            </select>
          </section>
          <section className="totalEarning">
            <div>
              <h5>
                this month payout <span> ₹{astrologer[0].balance}</span>{" "}
              </h5>
            </div>
          </section>
          <section className="earnTable">
            <Table
              className="table-striped-columns table-striped-order-even"
              responsive="sm"
              hover
              style={{ width: "100%" }}
            >
              <thead className="table-dark">
                <tr style={{ height: "50px" }}>
                  <th>S.No</th>
                  <th>Time spent (mins)</th> 
                  <th>Date</th>
                  <th>Month</th>
                  <th>Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {astrologer[0]?.payOutHistory?.map(
                  (data,i) =>
                  
                      <tr key={data.id}>
                      <td>
                        {i+1}
                      </td>
                      <td>
                        {data.totalChatTime}
                      </td>
                        <td>
                          {" "}
                          <p
                            style={{ color: "black" }}
                            className="con-lastMessage"
                          >
                            {new Date(data.date).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              // hour12: true,
                            })}
                          </p>
                        </td>
                        <td>
                          <p
                            style={{ color: "black" }}
                            className="con-lastMessage"
                          >
                            {new Date(data.date).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              month: "long", // Display only the month name
                            })}
                          </p>
                        </td>
                        <td>
                          <p className="con-timeStamp"  style={{color:"black"}}>{data?.amount}</p>
                        </td>
                      </tr>
                    
                )}
              </tbody>
            </Table>
          </section>
        </main>
      </div>
    </>
  );
}

export default Earnings;
