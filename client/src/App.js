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
  const regressionDataArr = [];
  console.log(data)

  for(let i=0;i<data.length;i++){
    let pointArray = [];
  
    Object.keys(data[i]).forEach((key) => {
      pointArray.push([data[i][key].x,data[i][key].y])
    });  
  
    const result = regression.linear(pointArray);
  
    const regressionData = result.points.map(el => {
      return {
        x: el[0],
        y: el[1]
      }
    });

    regressionDataArr.push(regressionData)
  }

  console.log(regressionDataArr[0][0])

  return {
    regressionDataArr 
  }
}


const App = () => {
  const [data, setData] = useState([]);
  const [equation, setEquation] = useState({});
  const [visibility, setVisibility] = useState({});
  
  const showTrendline = () => {
    setVisibility(!visibility)
  }
  

  useEffect(() => { 
    async function fetchData() {
      const dataSet = [];
      // const result = await callApi();
      for(let i=0;i<3;i++){
        dataSet.push(await callApi());
      }
      setData(dataSet);
      setEquation(await lineReg(dataSet));
      
      setVisibility(false)

    }
    fetchData();

  }, []);


  const callApi = async () => {
    const response = await fetch('/api/coords');
    let body = [];
    try {
      body = await response.json();
    }catch(error) {
      console.log(error);
    }

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
            {
              data.map((el, index) => (
                <MarkSeries
                  className="scatter"
                  data={data[index]}
                  key={index}
                />
              ))
            }
            {
              equation.regressionDataArr && visibility &&
              equation.regressionDataArr.map((el,index) => (
                
                <LineSeries
                  key={index}
                  data={equation.regressionDataArr[index]} 
                />
              ))
            }
            <XAxis />
            <YAxis />
          </XYPlot> 
        <button onClick={showTrendline}>Show Trendlines</button>

        </div>

{/* 
        <Table>
            {
              Object.keys(data).map((key, index) => (
                <tr key={index}>
                    <td>{data[key].x}</td>
                    <td>{data[key].y}</td>
                </tr>
              ))
            }
          </Table> */}
      </div>
      {console.log(visibility)}
    </div>
  );
}

export default App;
