import "../Stylesheets/Earnings.css";
import { earnings } from "../data";
import Table from "react-bootstrap/Table";
import Sidebar from "../components/Sidebar";
import Offcanvas from "../components/Offcanvas";


function Earnings() {
  return (
    <>
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
                  backgroundColor: "#EE721B",
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
          <section className="earnTable">
            <Table
              className="table-striped-columns table-striped-order-even"
              responsive="sm"
              hover
              style={{ width: "100%" }}
            >
              <thead class="table-dark">
                <tr style={{ height: "50px" }}>
                  <th>Month</th>
                  <th>Time spent (hrs)</th>
                  <th>Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {earnings.map((earn) => {
                  return (
                    <tr style={{ height: "50px" }}>
                      <td>{earn.month}</td>
                      <td>{earn.timeSpent}</td>
                      <td>{earn.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </section>
        </main>
      </div>
    </>
  );
}

export default Earnings;
