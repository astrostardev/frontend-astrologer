import "../Stylesheets/ChatHistory.css";
import Table from "react-bootstrap/Table";
import { chatHistory } from "../data";
import Sidebar from "../components/Sidebar";
import Offcanvas from "../components/Offcanvas";


function Chathistory() {
  return (
    <>
      <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <Offcanvas />
      </div>
      <div className="infoContainer">
        <main id="chatHistory">
          <section className="earnHead">
            <div>
              <h4>Chat History</h4>
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
                  <th>S.no</th>
                  <th>Client's Name</th>
                  <th>Date</th>
                  <th>Time (in Mins)</th>
                  <th>Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {chatHistory.map((chat, index) => {
                  return (
                    <tr style={{ height: "50px" }}>
                      <td>{index + 1}</td>
                      <td>{chat.name}</td>
                      <td>{chat.date}</td>
                      <td>{chat.length}</td>
                      <td>{chat.amount}</td>
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

export default Chathistory;
