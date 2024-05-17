import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../../components/Cards/Cards";
import { faEnvelope, faSackDollar, faIdCard, faRecycle, faDollarSign } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <div className="bg-white text-black">
      <div className="container-fluid py-8 px-4">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-content-center gap-4 mb-4">
          <Cards icon={faSackDollar} name="Total Rpin Balance" money={balance} />
          <Cards icon={faIdCard} name=" User ID" money={url} />
          <Cards icon={faIdCard} name=" User" money={user} />
          <Cards icon={faRecycle} name="Total Referrals" money={reffer} />
          <Cards icon={faDollarSign} name="Total Income" money={profit} />
        </div>

        <div className="table-responsive">
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
