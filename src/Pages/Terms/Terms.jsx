import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Terms.css'; 
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { FiPlus } from 'react-icons/fi';

const Terms = () => {
  const navigate = useNavigate()
  return (
    <div className="page">
        <Header/>
        <div className="app-content">
          <div className="section">
            <div className="page-header">
              <ol className="breadcrumb">
                <li className="breadcrumb1-item">
                    <h3>Terms</h3>
                </li>
              </ol>
              <div className="ml-auto">
                <Link to="#" className="btn btn-primary btn-icon btn-sm text-white mr-2">
                  <span> 
                  <FiPlus />
                    <span onClick={()=>navigate("/register")}> 
                    Add Account
                    </span>
                  </span>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h4>
                      <b>Welcome to Habib</b>
                    </h4>
                    <p>
                    Habib is an innovative employee tracking system designed to streamline workforce management and enhance productivity. 
                    By leveraging cutting-edge technology, Habib provides real-time tracking of employee locations, enabling organizations 
                    to monitor attendance, optimize resource allocation, and ensure workplace safety. This system is particularly 
                    beneficial for businesses with remote or field-based staff, offering detailed insights and analytics to support 
                    efficient decision-making. With ABC, companies can maintain transparency, improve operational efficiency, and foster 
                    a more accountable work environment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h4>
                      <b>Using Our Services</b>
                    </h4>
                    <p>
                    You understand and agree that the content on the Platform may not represent our views or values and may not be 
                    suited to your purpose. The Platform may contain links to third-party websites, advertisements, services, 
                    offers, or other events or activities that are not provided, owned, or controlled by Reelee.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h4>
                      <b>Privacy policy</b>
                    </h4>
                    <p>
                    This Tracking System is designed to enhance productivity and ensure the safety of our workforce. By using this system, employees acknowledge and consent 
                    that the company reserves the right to track and monitor their location during working hours.
                    This information may be shared with relevant parties within the organization to ensure operational efficiency and compliance with company policies.
                    Our commitment to transparency and data security remains paramount as we utilize this technology for the benefit of all stakeholders.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h4>
                      <b>Copyright</b>
                    </h4>
                    <p>
                     This Employee Tracking System is the exclusive property of Habib. 
                     All rights reserved. Unauthorized reproduction, distribution, or use of this software, 
                     in whole or in part, is strictly prohibited. The software has been designed and 
                     developed by Greenusys Technology Pvt Ltd. 
                     For any inquiries, please contact Habib directly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h4>
                      <b>Terms and Conditions</b>
                    </h4>
                    <p>
                    You understand and agree that the content on the Platform may not represent our views or values and may not be 
                    suited to your purpose. The Platform may contain links to third-party websites, advertisements, services, 
                    offers, or other events or activities that are not provided, owned, or controlled by Reelee. 
                    So read all the terms and condition wisely as reelee may not support anykind of views, ideas or support anytype of community.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
              <div className="card">
                    <div className="terms">
                      <p>Was this information Helpful?</p>
                      <p> 
                        <Link className="btn btn-primary text-white">Yes</Link>
                        <Link className="btn btn-secondary text-white">No</Link>
                      </p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
export default Terms;


