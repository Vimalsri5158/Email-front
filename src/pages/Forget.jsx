/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { backendUrl } from '../config';

const ForgotPassword = () => {
  const navigate = useNavigate(); // Use useNavigate hook directly
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a request to your server to initiate the password reset process
    const forgetResponse = await fetch(`${backendUrl}/forget`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (forgetResponse.ok) {
      setMessage('Password reset instructions sent to your email.');
      // Navigate to the "forget" page
      navigate('/forget'); // Use navigate without "Navigate" capitalization
    } else {
      const data = await forgetResponse.json();
      setMessage(data || 'Something went wrong.');
    }
  };

  if (localStorage.getItem('forget') && JSON.parse(localStorage.getItem('forget'))) {
    return <navigate to={'/'} replace={true} />;
  }

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
