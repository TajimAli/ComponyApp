import React, { useEffect, useState } from 'react';

const TableComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('data')) || [];
    setData(storedData);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index}>
            <td>{entry.name}</td>
            <td>{entry.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
