import React, { useState } from 'react';

function EmployeeSignupLogin() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    emailOrPhone: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const { emailOrPhone, password, confirmPassword } = form;

    if (!emailOrPhone || !password || (isSignup && !confirmPassword)) {
      setMessage('All fields are required.');
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\d{10}$/;
    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      setMessage('Please enter a valid email or phone number.');
      return false;
    }

    if (isSignup) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        setMessage('Password must be at least 8 characters, contain an uppercase letter, and a number.');
        return false;
      }

      if (password !== confirmPassword) {
        setMessage('Passwords do not match.');
        return false;
      }
    }

    return true;
  };

  const handleSignup = () => {
    if (validateForm()) {
      localStorage.setItem('employeeData', JSON.stringify(form));
      setMessage('Employee signup successful!');
    }
  };

  const handleLogin = () => {
    const savedData = JSON.parse(localStorage.getItem('employeeData'));
    if (savedData && savedData.emailOrPhone === form.emailOrPhone && savedData.password === form.password) {
      setMessage('Login successful!');
    } else {
      setMessage('Invalid login details.');
    }
  };
  

  return (
    <div className="form-container">
      <h2>Employee {isSignup ? 'Signup' : 'Login'}</h2>
      <div className="toggle-buttons">
        <button onClick={() => setIsSignup(false)}>Login</button>
        <button onClick={() => setIsSignup(true)}>Signup</button>
      </div>
      
      <input type="text" name="emailOrPhone" placeholder="Email or Phone Number" value={form.emailOrPhone} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />

      {isSignup && (
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />
      )}

      {isSignup ? (
        <button onClick={handleSignup}>Signup</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}

      <p>{message}</p>
    </div>
  );
}

export default EmployeeSignupLogin;