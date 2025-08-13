import React, { useState, useEffect } from "react";
import DisplayConnectionTable from "../Components/DisplayConnectionTable";

  const Connects = () => {

  //Connections to store the total users present fetched via API

  const [connections, setConnections] = useState([]);

  //isloading 

  const [isLoading, setIsLoading] = useState(true);

  //Parameters to be passed with GET

  const [year,setYear] = useState('2022');
  const [branch,setBranch]=useState('ECE');
  const [flag,setFlag]=useState(0);


  useEffect(() => {
    const getConnections = async () => {
      try {
        //Below API being modified to include the Optional Parameters in the GET Request
        let BackendAPI;
        if(!flag)
        {
          BackendAPI="http://localhost:4000/api/users/loginuser/newconnects?".concat("year=",year,"&branch=",branch,"&userId=","34");
        }
        else 
        {
          BackendAPI="http://localhost:4000/api/users/loginuser/newconnects?".concat("year=",year,"&branch=",branch);
        }
        const response = await fetch(BackendAPI, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await response.json();
        setConnections(data.a); //Storing the Fetched data from Mongoose via Backend
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    getConnections();
  }, [year,branch,flag]); // Empty dependency array means this runs once on mount

  //Applying For Loop on DisplayConnectionTable components
  const renderConnectionRows = () => {
    const rows = [];
    for (let i = 0; i < connections.length; i++) {
      rows.push(
        <DisplayConnectionTable
          key={i}
          name={connections[i].name}
          company={connections[i].company}
          year={connections[i].year}
          branch={connections[i].branch}
        />
      );
    }
    return rows;
  };

  return (
    <div className="flex flex-row text-white">
      
      <div className="flex w-3/4 h-full max-h-full text-white">

      <div className="flex w-1/4 h-1/4">

      <select className="bg-gradient-to-r from-cyan-500 to-blue-500" value={year} onChange = {(e)=>setYear(e.target.value)}>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
      </select>

      <select className="bg-gradient-to-r from-cyan-500 to-blue-500" value={branch} onChange = {(e)=>setBranch(e.target.value)}>
        <option value="ECE">ECE</option>
        <option value="CSE">CSE</option>
        <option value="EEE">EEE</option>
      </select>

      <select className="bg-gradient-to-r from-cyan-500 to-blue-500" value={flag} onChange = {(e)=>setFlag(e.target.value)}>
        <option value="0">My Connects</option>
        <option value="1">All Connects</option>
      </select>

      </div>
      <div>
      <input className="bg-gradient-to-r from-cyan-500 to-blue-500"></input>
      <button>Search</button>
      </div>

        <div className="flex">
          
          
          <table className="table-auto">
          
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Year</th>
                <th>Branch</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                connections.length > 0 ? (
                  renderConnectionRows()
                ) : (
                  <tr>
                    <td colSpan="3">No connections found.</td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex w-1/4 h-full max-h-full">
        Chat

        <div className="flex w-1/4 h-full max-h-full">
        sdsd</div>
      </div>
    </div>
  );
};

export default Connects;
