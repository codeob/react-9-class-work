import React, { useState, useEffect } from 'react';

const User = () => {
  const ApiURL = 'https://jsonplaceholder.typicode.com/users';
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate 3-second delay
      await new Promise((res) => setTimeout(res, 3000));

      const response = await fetch(ApiURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
   <div className="flex items-center justify-center min-h-screen">
  <div className="w-16 h-16 border-4 border-t-blue-500 border-r-blue-300 border-b-blue-100 border-l-blue-300 rounded-full animate-spin"></div>
</div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        <h2>Error: {error.message}</h2>
        <button onClick={fetchData} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mb-6">Users List</h1>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((user) => (
          <li key={user.id} className="border p-4 rounded shadow-md bg-white">
            <h2 className="text-xl font-bold text-blue-600">{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </li>
        ))}
      </ul>
      <div className="text-center mt-8">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          onClick={fetchData}
        >
          Fetch Data Again
        </button>
      </div>
    </div>
  );
};

export default User;
