import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
    <footer className="footer left-footer">
      <div className="container">
          <div className="col-md-12 col-sm-12 text-center">
            Copyright © 2024 <a href="#">Reelee</a>. Designed by{" "}
            <Link to="http://greenusys.com">Greenusys Technologies Pvt.Ltd</Link> All rights reserved.
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer