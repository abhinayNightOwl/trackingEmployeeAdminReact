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
                      <b>Welcome to ABC</b>
                    </h4>
                    <p>
                    ABC is an innovative employee tracking system designed to streamline workforce management and enhance productivity. 
                    By leveraging cutting-edge technology, ABC provides real-time tracking of employee locations, enabling organizations 
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
                    We prioritize protecting and securing your information on Reelee. 
                    Unauthorized access to any part of Reelee is not permitted. 
                    Additionally, attempts to obtain sensitive, confidential, commercial, or personal information, 
                    as well as any abuse of the platform's security, integrity, or reliability, are strictly prohibited.
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
                    Reelee's copyright policy is designed to protect the intellectual property rights of creators while maintaining a vibrant, 
                    creative community. The platform requires users to ensure that they have the necessary rights to any content they 
                    upload,including music, video clips, and images, prohibiting the sharing of copyrighted material without permission. 
                    When copyright infringement is reported through a valid Digital Millennium Copyright Act (DMCA) notice, Reelee removes the infringing content and may suspend or terminate repeat offenders' accounts. 
                    The policy also allows for counter-notices, enabling users to dispute removals they believe were made in error, typically by demonstrating that their use of the content was authorized or falls under fair use. 
                    To support compliance, Reelee offers a library of licensed music and sound clips, along with educational resources to help users understand copyright laws. By balancing protection with access, 
                    Reelee aims to respect creators' rights while fostering an environment where users can creatively express themselves within legal bounds.
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
