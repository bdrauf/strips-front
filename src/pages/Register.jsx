import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
/* eslint-disable */
const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [err, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(inputs.email)) {
      setError('Invalid email address');
      return;
    }

    if (!validatePassword(inputs.password)) {
      setError(
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
      );
      return;
    }

    try {
      await axios.post('/api/auth/register', inputs);
      navigate('/login');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <div className="passContainer">
          <input
            required
            type={showPassword ? 'text' : 'password'}
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="showpass"
          >
            {showPassword ? (
              <img
                src="https://img.icons8.com/ios-filled/50/000000/visible.png"
                alt="Hide Password"
              />
            ) : (
              <img
                src="https://img.icons8.com/ios-filled/50/000000/invisible.png"
                alt="Show Password"
              />
            )}
          </button>
        </div>
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
