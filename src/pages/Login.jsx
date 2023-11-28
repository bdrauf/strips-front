import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const [err, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate('/');
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          type="text"
          placeholder="username"
          name="username"
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
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
