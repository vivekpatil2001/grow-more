import React, { useEffect, useState } from "react";
import Aos from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faBullhorn, faSackDollar, faIdCard, faRecycle, faDollarSign, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FaCircleUser } from "react-icons/fa6";
import { FaUserShield } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { MdAccountBalanceWallet } from "react-icons/md";
import Button from "react-bootstrap/Button";
import "../Admin/Admin.css";
import "./Dashboard.css"; // Assuming you will create a Dashboard.css for custom styles
import anmt from "./announcement.png";
import glogo from "./glogo.png";
function Dashboard() {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [user, setUser] = useState("");
  const [balance, setBalance] = useState("");
  const [profit, setProfit] = useState("");
  const [reffer, setReffer] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const storedData = localStorage.getItem("user");
      if (!storedData) {
        // Handle the case where 'user' is not stored in local storage
        return;
      }
      const formData = JSON.parse(storedData)[1];
      const res = await fetch(
        "http://localhost/growmore/client.php/" + formData
      );
      const resData = await res.json();

      if (resData) {
        setUrl(resData[0].user_id);
        setBalance(resData[0].balance);
        setUser(resData[0].email);
        setProfit(resData[0].profit);

        if (resData[1].result) {
          setReffer(resData[1].result);
        } else {
          setReffer(resData.length - 1);
        }

        setData(resData);
      }
    };

    getUserData();
  }, []);

  const [seconds, setSeconds] = useState(3600); // Adjusted initial value for testing

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className=" text-black text position-relative">
      <p className="grow-logo">
        <img src={glogo} alt="logo" className="grow-logo" />
      </p>
      <br />

      <div className="container-fluid py-5 mt-5 ">
        {/* Announcement Box */}
        <div className="row justify-content-center mb-5  ">
            <div className=" announcement-box rounded d-flex flex-column justify-content-center ">
              <div>
                <span className="answ fs-3 ">Announcement:</span>

                <img
                  src={anmt}
                  className="mx-4 link sound-image"
                  height={"80vw"}
                ></img>
               </div>

              <p className="">
                This is an important announcement for all users.
                <br />
                <a href="https://t.me/big_bull_refer_and_earn" target="/blank">
                  https://t.me/big_bull_refer_and_earn
                </a>
              </p>

              {/* <FontAwesomeIcon icon={faBullhorn} className="announcement-icon fs-3"/> */}
          </div>
        </div>

        {/* Main Content */}
        <div className="row mb-4 mx-4">
          <div className="col-md-6 mb-4">
            <div className="d-flex justify-content-between align-items-center custom-border rounded ">
              <p className="font-weight-semibold mb-0 ">
                <Button variant="outline-success" className="mx-3">
                  <MdAccountBalanceWallet className="fs-2 " />
                </Button>
                Balance
              </p>
              <div className="d-flex align-items-center text-dark rounded p-2 ">
                <p className="mb-0">{balance}</p>
              </div>
            </div>
            <div className="text-center mb-2">
              <p className="font-weight-medium my-2">
                Create ID will start in {formatTime(seconds)}
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center custom-border mb-5  bg-success-light rounded ">
              <p className="font-weight-semibold mb-0 ">
                {" "}
                <Button variant="outline-success" className="mx-3">
                  <FaCircleUser className="fs-2" />
                </Button>
                User
              </p>
              <p className="mb-0">{user}</p>
            </div>
          </div>
          <div className="col-md-6 mb-4 ">
            <div className="d-flex justify-content-between align-items-center custom-border mb-4 bg-success-light rounded referral-box">
              <p className="font-weight-semibold mb-0">
                <Button variant="outline-success" className="mx-3">
                  <HiUserGroup className="fs-2" />
                </Button>
                Total Referrals
              </p>
              <p className="mb-0">{reffer}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center custom-border mt-5 bg-success-light rounded   p-3 income-box">
              <div className="d-flex align-items-center">
                <p className="font-weight-semibold mb-0 w-75">
                  <Button variant="outline-success" className="mx-3">
                    {" "}
                    <MdAccountBalanceWallet className="fs-2" />{" "}
                  </Button>
                  Total Income
                </p>
              </div>
              <p className="mb-0">₹{profit}</p>
            </div>
          </div>
        </div>
        <div className="mx-4">
          <p className="font-weight-medium mb-2 ">My Referral Code</p>
          <div className="d-flex justify-content-between align-items-center custom-border bg-success-light rounded my-3 referral-code-box">
            <p className="mb-0 ml-2">{url}</p>
            <Button variant="outline-warning text-dark">Copy</Button>{" "}
          </div>
        </div>
        <div className="table-responsive mt-4">
          <p className="font-weight-medium mb-2 mx-4">My Referrals</p>
          <table className="table table-striped">
            <thead className="bg-gray-50 text-dark ">
              <tr>
                <th scope="col">User Id</th>
                <th scope="col">Email</th>
                <th scope="col">Plan</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row, i) => (
                <tr key={i}>
                  <td className="text-dark">{row.user_id}</td>
                  <td className="text-dark">{row.email}</td>
                  <td className="text-dark">{row.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
