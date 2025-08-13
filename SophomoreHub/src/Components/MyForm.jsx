import React, { useState, useEffect } from 'react';
import { socket } from '../Libraries/socket';

export function MyForm() {
  const [value, setValue] = useState('');
  //const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   socket.on('newMessage', (message) => {
  //     //setMessages((prevMessages) => [...prevMessages, message]);
  //   });
  // }, []);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    socket.connect();
    socket.emit('hello', value, (response) => {
    console.log(response); // "got it"
    //setMessages((prevMessages) => [...prevMessages, value]);
    setIsLoading(false);
    setValue(''); // Clear input after message is sent
    });
    let email="sdsd";
    let password="sdsd";    
    let data = {
      "email":email,
      "password":password
    };
  

    let formdata={
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    };


    let form2data={
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    };
45
    //Send Chat
    let backendpoint='http://localhost:4000/api/users/loginuser/sendChat';
    fetch(backendpoint,formdata)
      .then(response => response.json())
      .catch(error => console.error('Error fetching data:', error));

    //Load Connect
    let backendpoint2='http://localhost:4000/api/users/loginuser/loadConnects';
    fetch(backendpoint2,form2data)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
  }


  return (
  <div class="flex my-10">
    <div class="flex-1 w-32">
      <div class="flex flex-col text-left">
        <div>Ved Vyas</div>
        <div>John Shama</div>
        <div>Mahesh Mueller</div>
      </div>
    </div>
    <div class="flex-1 w-32 ...">
      <p class="text-left">So I started to walk into the water</p>
      <p class="text-right">So I started to walk into the water</p>
      <div>
      {/* <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul> */}
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div>
        <button type="submit" disabled={isLoading}>Send</button>
        </div>
      </form>
    </div>
      </div>
      </div> 
  );
}