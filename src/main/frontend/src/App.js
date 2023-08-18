
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/league') // Replace with your actual API endpoint
      .then(response => response.text())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>
      {data && <p>{data}</p>}
    </div>
  );
}

export default App;

