import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

function WorkflowChart({ owner, repo, workflow }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/workflow/${owner}/${repo}/${workflow}`);
        console.log(response.data);
        setData(response.data.map((run, index) => ({ name: `Run ${index + 1}`, url: run.url, uv: run.duration })));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [owner, repo, workflow]);

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;

    return (
      <g>
        <circle cx={cx} cy={cy} r={8} stroke="#8884d8" strokeWidth={1} fill="#8884d8" />
        <a href={payload.url} target="_blank" rel="noopener noreferrer">
          <circle cx={cx} cy={cy} r={8} fillOpacity={0} />
        </a>
      </g>
    );
  };

  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={<CustomDot />} />
    </LineChart>
  );
}

export default WorkflowChart;