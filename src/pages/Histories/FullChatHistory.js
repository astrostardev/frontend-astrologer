import "../../Stylesheets/ChatHistory.css";
import Table from "react-bootstrap/Table";
import Sidebar  from "../../components/Sidebar";
import OffCanvasNav from "../../components/Offcanvas";
import MetaData from "../../pages/MetaData";
import { extractTime } from "../../utils/extractTime";
import { useParams } from "react-router-dom";

import { useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {
  fetchChatFail,
  fetchChatRequest,
  fetchChatSuccess,
} from "../../slice/conversationSlice";
const ENDPOINT = process.env.REACT_APP_SOCKET_URL;
function FullChatHistory() {
  const {astrologer } = useSelector((state) => state.astroState);
  const [chatHistory, setChatHistory] = useState(astrologer[0]?.chatDetails);
  const { id } = useParams();


  //call Pop
const [incomingCall, setIncomingCall] = useState(null);
const [socket, setSocket] = useState(null);
const dispatch = useDispatch();

useEffect(() => {
  const newSocket = new WebSocket(ENDPOINT);

  newSocket.onopen = () => {
    console.log("WebSocket is open");
    const setupMessage = { type: "setup", userId: astrologer[0]?._id };
    newSocket.send(JSON.stringify(setupMessage));
    dispatch(fetchChatRequest()); // Fetch chat messages on open
  };

  newSocket.onmessage = (message) => {
    try {
      const data = JSON.parse(message.data);
      if (data.type === 'call-notification') {
        setIncomingCall(data.userId); // Handle incoming call
      }
    } catch (error) {
      console.error("Error processing WebSocket message:", error);
    }
  };

  newSocket.onclose = () => {
    console.log("Disconnected from WebSocket server");
  };

  newSocket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };


  setSocket(newSocket);

  return () => {
    newSocket.close(); // Ensure proper cleanup
  };
}, [ENDPOINT, astrologer]);

useEffect(() => {
  if (incomingCall) {
    // Trigger an alert when an incoming call is detected
    window.alert(`Incoming call from user: ${incomingCall}`);
  }
}, [incomingCall]);
  return (
    <div>
      <MetaData title={"Astro5Star-ChatHistory"} />

      <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>
      <main id="chatHistory" className="infoContainer">
        <section className="earnHead">
          <div>
            <h4>Full Chat History</h4>
            <div
              style={{
                height: "3px",
                width: "75px",
                backgroundColor: "#229e48",
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
              {chatHistory
                ?.filter((chat) =>
                  chat.sameUser.some(
                    (user) => user.userId === id
                  )
                )
                .slice(-10)
                .map((chat, index) => (
                  <>
                    {chat.sameUser
                      .filter((user) => user.userId === id)
                      .map((user, astroIndex) => (
                        <tr
                          style={{ height: "50px" }}
                          key={`${index}-${astroIndex}`}
                        >
                          <td>{astroIndex + 1}</td>
                          <td style={{ textTransform: "capitalize" }}>
                            {user.name}
                          </td>
                          <td>
                            {new Date(user.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                            , {extractTime(user.date)}
                          </td>
                          <td>{user.chatTime} mins</td>
                          <td>&#8377; {user.earnedAmount}</td>
                        </tr>
                      ))}
                  </>
                ))}
            </tbody>
          </Table>
        </section>
      </main>
    </div>
  );
}

export default FullChatHistory;
