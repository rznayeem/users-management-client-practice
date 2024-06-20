import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const id = users.length + 1;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { id, name, email };
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        const newUser = [...users, data];
        setUsers(newUser);
      });
  };

  return (
    <>
      <h1>Users Management Recap</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" />
        <input type="email" name="email" id="" />
        <input type="submit" value="Add User" />
      </form>

      <div>
        {users.map((user, idx) => (
          <p key={idx}>
            Name: {user.name} Email: {user.email}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
