import React, { useState, useEffect, } from 'react';
import regression from 'regression';
import {
  XYPlot,
  YAxis,
  XAxis,
  LineSeries,
  MarkSeries,
  HorizontalGridLines,
  VerticalGridLines
} from 'react-vis';
import '../node_modules/react-vis/dist/style.css';
import './App.css';

const lineReg = (data) => {
  let pointArray = [];

  Object.keys(data).forEach((key) => {
    pointArray.push([data[key].x,data[key].y])
  });

  const result = regression.linear(pointArray);
  const gradient = result.equation[0];
  const yInt = result.equation[1];
  const prediction = result.predict(70);

  console.log(prediction);

  const regressionData = result.points.map(el => {
    return {
      x: el[0],
      y: el[1]
    }
  })

  return {
    regressionData,
    gradient,
    yInt,
    prediction
  }
}


const App = () => {
  const [data, setData] = useState([]);
  const [equation, setEquation] = useState([]);
  
  const showTrendline = () => {

  }
  

  useEffect(() => { 
    async function fetchData() {
      const result = await callApi();
      setData(result);
      setEquation(lineReg(result));

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
        <div className="chart">
          <XYPlot
            width={500}
            height={500} 
          >
            <HorizontalGridLines />
            <VerticalGridLines />
            <MarkSeries
              className="scatter"
              data={data}
            />
            <LineSeries
              // color="red"
              data={equation.regressionData} />
            <XAxis />
            <YAxis />
          </XYPlot>          
        </div>

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
          <button onClick={showTrendline}>Show Trendline</button>
          {console.log(equation)}
      </div>

    </div>
  );
}

export default App;
