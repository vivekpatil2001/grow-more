import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faSackDollar, faIdCard, faRecycle, faDollarSign, faWallet } from '@fortawesome/free-solid-svg-icons';
// import './Dashboard.css'; // Assuming you will create a Dashboard.css for custom styles

function Dashboard() {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState('');
  const [user, setUser] = useState('');
  const [balance, setBalance] = useState('');
  const [profit, setProfit] = useState('');
  const [reffer, setReffer] = useState('');
  
  useEffect(() => {
    const getUserData = async () => {
      const storedData = localStorage.getItem('user');
      if (!storedData) {
        // Handle the case where 'user' is not stored in local storage
        return;
      }
      const formData = JSON.parse(storedData)[1];
      const res = await fetch("http://localhost/growmore/client.php/" + formData);
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
    }
    
    getUserData();
  }, []);
  
  const referralCode = "ABC123XYZ";
  const [seconds, setSeconds] = useState(3600); // Adjusted initial value for testing

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds > 0 ? prevSeconds - 1 : 0);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-white text-black dashboard-container">
      <div className="container-fluid py-4">
        {/* Announcement Box */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-10">
            <div className="announcement-box border border-secondary rounded h3 p-2">
              <strong>Announcement:</strong>
              <p className="p-4">
                This is an important announcement for all users.
              </p>
              <FontAwesomeIcon icon={faBullhorn} className="announcement-icon"/>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="row mb-4">
          <div className="col-md-6 mb-4">
            <div className="d-flex justify-content-between align-items-center border shadow rounded p-3 mb-2 balance-box">
              <p className="font-weight-semibold mb-0">rPIN Balance</p>
              <div className="d-flex align-items-center bg-success text-white rounded p-2">
                <p className="mb-0 mr-2">Total</p>
                <p className="mb-0">{balance}</p>
              </div>
            </div>
            <div className="text-center mb-2">
              <p className="font-weight-medium mb-1">Create ID will start in</p>
              <p>{formatTime(seconds)}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center border shadow bg-success-light rounded p-3 created-box">
              <p className="font-weight-semibold mb-0">IDs Created Today</p>
              <p className="mb-0">0</p>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="d-flex justify-content-between align-items-center border shadow bg-success-light rounded p-3 mb-2 referral-box">
              <p className="font-weight-semibold mb-0">Total Referrals</p>
              <p className="mb-0">{reffer}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center border shadow bg-success-light rounded p-3 income-box">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faWallet} className="mr-2"/>
                <p className="font-weight-semibold mb-0">Total Income</p>
              </div>
              <p className="mb-0">₹{profit}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="font-weight-medium mb-2">My Referral Code</p>
          <div className="d-flex justify-content-between align-items-center border bg-success-light rounded p-2 referral-code-box">
            <p className="mb-0 ml-2">{referralCode}</p>
            <button className="btn btn-success text-white">Copy</button>
          </div>
        </div>
        <div className="table-responsive mt-4">
          <table className="table table-striped">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col">User Id</th>
                <th scope="col">Email</th>
                <th scope="col">Plan</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row, i) => (
                <tr key={i}>
                  <td>{row.user_id}</td>
                  <td>{row.email}</td>
                  <td>{row.plan}</td>
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
