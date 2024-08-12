import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Forget = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    const apiURL = 'https://employee-attendance-dr6b.onrender.com/admin/forgot';
    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      });
      if (!response.ok) {
        throw new Error('Failed to reset password');
      }
      const data = await response.json();
      setMessage(data.message);
      // Redirect to login or another page after successful password reset
      navigate('/dashboard/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="login-img">
        <div className="page h-100">
          <div className="">
            <div className="col col-login mx-auto">
              <div className="text-center">
                <img src="assets/images/brand/logo.png" className="header-brand-img" alt="" />
              </div>
            </div>
            <div className="container-login100">
              <div className="wrap-login100 p-6">
                <div className="col col-login mx-auto">
                  <form className="" method="post" onSubmit={handleForgetPassword}>
                    <div className="">
                      <h3 className="text-center card-title">Forgot password</h3>
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
                      <div className="wrap-input100 validate-input" data-validate="Password is required">
                        <input
                          className="input100"
                          type="password"
                          name="confirm-password"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span className="focus-input100" />
                        <span className="symbol-input100">
                          <i className="zmdi zmdi-lock" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="form-footer">
                        <button type="submit" className="btn btn-primary btn-block">Send</button>
                      </div>
                      {message && <div className="text-center text-success mt-3">{message}</div>}
                      {error && <div className="text-center text-danger mt-3">{error}</div>}
                      <div className="text-center text-muted mt-3">
                        Forget it, <Link to="/dashboard/login">send me back</Link> to the sign in screen.
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;
