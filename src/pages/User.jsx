/* eslint-disable no-extra-semi */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendUrl  } from "../config";
import jwtDecode from "jwt-decode";

const UserDialog = ({ handleDialog, fetchUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

{/**accesstoken post req method */}
    const { accessToken} = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await fetch(`${backendUrl}/users`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':accessToken
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json();
        await fetchUsers();
        handleDialog();
      } else {
        const errorData = await response.json();
        setError(errorData.msg);
      }
    } catch (error) {
      console.error('Error submitting user data:', error);
      setError('An error occurred while submitting the form.');
    }
  };

  {/**Form data  validation */}
  return (
    <div className="dialog">
      <div className="dialog-root">

        <form
          onSubmit={handleSubmit}
          style={{
            marginLeft: "20px",
            marginTop: "30px",
            color: "white",
            fontSize: "14px",
          }}
        >
          <label htmlFor="name" 
              style=
              {{
                color:'maroon',
                fontSize:'16px'
              }}>
              <b>Name:</b>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <br />

          <label htmlFor="age" 
              style=
              {{
                color:'maroon',
                fontSize:'16px', 
                marginLeft:'20px'
              }}>
              <b>Age:</b>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
          <br />

          <label style=
            {{
              color:'maroon',
              fontSize:'16px',
              marginLeft:'-100px'
            }}>
            <b>Gender:</b>
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <br />

    
          <button
            type="submit"
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "10px",
            }}
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}



function User() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [userRole, setRole] = useState('normal');


  const handleDialog = () => {
    if(showDialog) {
      setShowDialog(false);
  }else{
    setShowDialog(true);
  }
}

{/**accesstoken fetch user get req method */}
const {accessToken} = JSON.parse(localStorage.getItem('user'));

const fetchUsers = async () => {

    const response = await fetch(`${backendUrl}/users`,
    {
    headers : {
      'auth-token': accessToken,
      }
    }
    );
      const data = await response.json();
      setUsers(data);
    } 


    {/**accesstoken fetch user delete req method */}
const deleteUser = async (userId) => {
    const response = await fetch(`${backendUrl}/users/${userId}`, 
    {
      method: 'DELETE',
      headers: {
        'auth-token': accessToken,
          }
    });
      await response.json();
      setUsers((users.filter((user) => user.id !== userId)));
    }

  useEffect(() => {

    fetchUsers(); 
    const { accessToken } = JSON.parse(localStorage.getItem('user'))

    const {role} = jwtDecode(accessToken);

    setRole(role);
  }, []); 

  return (
    <>
      <div className="user-header">

        <h2 className="font">LIST OF USERS</h2>

        <div className='buttons'>
          <div style={{float:'left',marginLeft:'-250px'}}>
            {userRole === 'admin' && (
              <button onClick={handleDialog} 
                className="btn btn-danger">
                Add New User
              </button>
            )}
          </div>

          <div style={{marginRight:'500px',float:'right'}}>
            <button
              className="btn btn-danger"
              onClick={() => {
              localStorage.removeItem('user');
              navigate('/login');
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="user-table">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              {userRole === 'admin' && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                {userRole === 'admin' && (
                  <td>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/**Userdialog */}
      {showDialog && 
        <UserDialog 
        handleDialog={handleDialog} 
        fetchUsers={fetchUsers} 
        />}
    </>
  );
                }  

export default User;