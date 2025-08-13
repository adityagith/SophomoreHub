import React, { useState, useEffect } from 'react';
import { socket } from '../Libraries/socket';
import { MyForm } from '../Components/MyForm';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const handleSubmit = (event) =>{
    event.preventDefault();
    //Sending Chat via Socket(sendChat)
    let backendpoint='http://localhost:4000/api/users/loginuser/sendChat';
    fetch(backendpoint,formdata)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));

    //Load Connect
    let backendpoint2='http://localhost:4000/api/users/loginuser/loadConnects';
    fetch(backendpoint2)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
  };


  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    socket.on('connect', onConnect);


    return () => {
      socket.off('connect', onConnect);
    };
  }, []);

  return (

<div>
      <div className="App">
      <MyForm />
      </div>
</div>
  );
}