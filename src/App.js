import React from 'react';
import { useState } from 'react';
import './App.css';

function App(){
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const [error , setError] = useState("");
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [contacts, setContacts] = useState([
    { id: 1, name: "Aanya Sharma", email: "aanya@gmail.com" },
  { id: 2, name: "Rohan Mehta", email: "rohan@gmail.com" },
  ]);
  const [newName , setNewName] = useState("");
  const [newEmail , setNewEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [users, setUsers] = useState([
    {username: "admin",password: "admin123"},
  ]);
  const [mode, setMode] = useState("login");
  const [confirmPassword, setConfirmPassword] = useState("");

  


  function handleLogin(){
    const found = users.find(
      (u) => u.username === username && u.password ===password);

      if (found) {
        setError("");
        setIsLoggedIn(true);

      }
      else{
        setError("username or password is wrong");
      }
  }

  function handleRegister(){
    if(username === "" || password === ""){
    setError("enter username and password");
    return;
  }
  if(password !==confirmPassword) {
    setError("password not match");
    return;
  }

  const alreadyExists = users.some((u)=> u.username === username);
  if(alreadyExists){
    setError("username already exists");
    return
  }
  const newUser = {username: username, password: password};
  setUsers([...users, newUser]);
  setError("");
  setIsLoggedIn(true);
}
    
    
    
  
    function handleSaveContact(){
    if(newName === "" || newEmail === ""){
      return;
    }

    if(editId !== null){
      const updatedContacts = contacts.map((c) =>
        c.id === editId ? {...c, name:newName, email: newEmail} : c
      );
      setContacts(updatedContacts);
      setEditId(null);
    } else {
      const newContact = {
        id: contacts.length+1,
        name: newName,
        email: newEmail,
      };
      setContacts([...contacts, newContact]);
    }

    setNewName("");
    setNewEmail("");
  }

  function handleDelete(id){
    const updatedContacts = contacts.filter((c) => c.id !== id);
    setContacts(updatedContacts);
  }

  function handleEdit(contact){
    setNewName(contact.name);
    setNewEmail(contact.email);
    setEditId(contact.id);
  }

  function handleLogout(){
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setMode("login");

    }
  

  return(
  <div className="page">
    {isLoggedIn ? (
      <div className="dashboard">
        <div className="topbar">
          <h1>Dashboard</h1>
          <button className="btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
        <p className="welcome-text">welcome, {username}!</p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(c)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="add-form">
          <h3>Add new Contact</h3>
          <input
            className="input-field"
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button className="btn-primary" onClick={handleSaveContact}>
            {editId !== null ? "Update Contact" : "Add Contact"}
          </button>
        </div>
      </div>
    ) : (
      mode === "login" ? (
        <div className="auth-card">
          <h1>Login</h1>
          <input
            className="input-field"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input-field"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-primary" onClick={handleLogin}>Login</button>
          {error && <p className="error-text">{error}</p>}
          <p className="switch-text">
            Account doesn't exist?{" "}
            <button className="link-btn" onClick={() => { setMode("register"); setError(""); }}>
              Register
            </button>
          </p>
        </div>
      ) : (
        <div className="auth-card">
          <h1>Register</h1>
          <input
            className="input-field"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input-field"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="btn-primary" onClick={handleRegister}>Register</button>
          {error && <p className="error-text">{error}</p>}
          <p className="switch-text">
            Already have an account?{" "}
            <button className="link-btn" onClick={() => { setMode("login"); setError(""); }}>
              Login
            </button>
          </p>
        </div>
      )
    )}
  </div>
);
}
export default App;