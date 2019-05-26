import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => { 
    async function fetchData() {
      const result = await callApi();
      setData(result);
    }
    fetchData();
  }, []);

  const callApi = async () => {
    const response = await fetch('/api/coords');
    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);
    return body;
  }

  const Table = props => (
    <table>
      <thead>
        <tr>
          <th>x</th>
          <th>y</th>
        </tr>
      </thead>
      <tbody>
        {props.children}
      </tbody>

    </table>
  );

  return (
    <div className="App">
      <div className="container">
        <Table>
            {
              Object.keys(data).map((key, index) => (
                <tr key={index}>
                    <td>{data[key].x}</td>
                    <td>{data[key].y}</td>
                </tr>
              ))
            }
          </Table>

      </div>

    </div>
  );
}

export default App;
