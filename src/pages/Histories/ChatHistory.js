import "../../Stylesheets/ChatHistory.css";
import Table from "react-bootstrap/Table";
import Sidebar from "../../components/Sidebar";
import Offcanvas from "../../components/Offcanvas";
import MetaData from "../MetaData";
import { useSelector } from "react-redux";
import { useState } from "react"
import { extractTime } from "../../utils/extractTime";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Chathistory() {
  const {astrologer}=useSelector((state)=>state.astroState)
  const [chatHistory, setChatHistory] = useState(astrologer[0]?.chatDetails);
 const navigate = useNavigate()
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
        <main id="chatHistory">
          <section className="earnHead">
            <div>
              <h4>Chat History</h4>
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
              <thead className="table-dark">
                <tr style={{ height: "50px" }}>
                  <th>S.no</th>
                  <th>Client's Name</th>
                  <th>Date</th>
                  <th>Time (in Mins)</th>
                  <th>Amount (₹)</th>
                  <th>Details</th>

                </tr>
              </thead>
              <tbody className="table-group-divider">
                {chatHistory?.map((chat, index) => {
                  return (
                    <tr style={{ height: "50px" }} key={index}>
                             <td>{index + 1}</td>
                      <td>    {chat &&
                        chat.sameUser &&
                        chat.sameUser.length > 0 &&
                        chat.sameUser[chat.sameUser.length - 1]
                          .name}</td>
                      <td> {new Date(
                        chat &&
                          chat.sameUser&&
                          chat.sameUser.length > 0 &&
                          chat.sameUser[chat.sameUser.length - 1]
                            .date
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      ,{" "}
                      {extractTime(
                        chat &&
                          chat.sameUser &&
                          chat.sameUser.length > 0 &&
                          chat.sameUser[chat.sameUser.length - 1]
                            .date
                      )}</td>
                      <td> {chat &&
                        chat.sameUser &&
                        chat.sameUser.length > 0 &&
                        chat.sameUser[chat.sameUser.length - 1]
                          .chatTime}</td>
                      <td> {chat &&
                        chat.sameUser &&
                        chat.sameUser.length > 0 &&
                        chat.sameUser[chat.sameUser.length - 1]
                          .earnedAmount}</td>
                             <td>
                      <Button variant="success" onClick={()=> navigate(`/full_chat_history/${chat.sameUser[chat.sameUser.length - 1].userId}`)}>
                      View
                      </Button>
                    </td>
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
