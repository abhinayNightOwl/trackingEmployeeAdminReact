import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const apiURL = 'https://employee-attendance-dr6b.onrender.com/admin/register';

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      // Handle successful registration (e.g., navigate to login page)
      console.log('Registration successful:', data);
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="page h-100">
        <div className="">
          <div className="col col-login mx-auto">
            <div className="text-center">
              <img src="assets/images/brand/logo.png" className="header-brand-img" alt="" />
            </div>
          </div>
          <div className="container-login100">
            <div className="wrap-login100 p-6">
              <form className="login100-form validate-form" onSubmit={handleRegister}>
                <span className="login100-form-title">Registration</span>
                <div className="wrap-input100 validate-input" data-validate="User name is required">
                  <input
                    className="input100"
                    type="text"
                    name="username"
                    placeholder="User name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="mdi mdi-account" aria-hidden="true" />
                  </span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                  <input
                    className="input100"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="zmdi zmdi-email" aria-hidden="true" />
                  </span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Password is required">
                  <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="zmdi zmdi-lock" aria-hidden="true" />
                  </span>
                </div>
                <label className="custom-control custom-checkbox mt-4">
                  <input type="checkbox" className="custom-control-input" />
                  <span className="custom-control-label" onClick={() => navigate("/terms")}>
                    Agree the <a href="terms">terms and policy</a>
                  </span>
                </label>
                <div className="container-login100-form-btn">
                  <button type="submit" className="login100-form-btn btn-primary">Register</button>
                </div>
                {error && <div className="text-center text-danger mt-3">{error}</div>}
                <div className="text-center pt-3">
                  <p className="text-dark mb-0">
                    Already have account?
                    <Link to="/dashboard/login" className="text-primary ml-1">
                      <i className="mdi mdi-logout-variant mr-2" />
                      <span onClick={() => navigate("/dashboard/login")}>Sign In</span>
                    </Link>
                  </p>
                </div>
                {/* <div className="flex-c-m text-center mt-3">
                  <p>Or</p>
                  <div className="social-icons">
                    <ul>
                      <li>
                        <a className="btn btn-social btn-block">
                          <i className="fa fa-google-plus text-google-plus" />
                          Sign up with Google
                        </a>
                      </li>
                      <li>
                        <a className="btn btn-social btn-block mt-2">
                          <i className="fa fa-facebook text-facebook" />
                          Sign in with Facebook
                        </a>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
