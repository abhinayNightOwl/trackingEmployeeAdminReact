import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const response = await fetch('https://employee-attendance-dr6b.onrender.com/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    

    if (response.ok) {
      const data = await response.json();
      const token = data.result?.accessToken;
      localStorage.setItem('jwtToken', token);
      console.log('Login successful:', data);
      navigate('/dashboard');
    } else {
      console.error('Login failed');
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
              <form className="login100-form validate-form" onSubmit={handleLogin}>
                <span className="login100-form-title">Member Login</span>
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
                    name="pass"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="zmdi zmdi-lock" aria-hidden="true" />
                  </span>
                </div>
                <div className="text-right pt-1">
                  <p className="mb-0">
                    <a href="forget" className="text-primary ml-1">
                      <i className="mdi mdi-logout-variant mr-2" />
                      <span onClick={() => navigate('/forget')}>Forgot Password?</span>
                    </a>
                  </p>
                </div>
                <div className="container-login100-form-btn">
                  <button type="submit" className="login100-form-btn btn-primary">
                    Login
                  </button>
                </div>
                <div className="text-center pt-3">
                  <p className="text-dark mb-0">
                    Not a member?
                    <a href="register" className="text-primary ml-1">
                      <i className="mdi mdi-logout-variant mr-2" />
                      <span onClick={() => navigate('/register')}>Sign Up</span>
                    </a>
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
};

export default Login;
