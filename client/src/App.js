import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    callApi()
      .then(res => setResponse({ response: res.express }))
      .catch(err => console.log(err));
  });

  const callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    return body;
  }


  return (
    <div className="App">
      <h1>{response.response}</h1>

    </div>
  );
}

export default App;
