import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import SignupLogin from './UserLogin';
// import CompanySignupLogin from './CompanyLogin';
// import EmployeeSignupLogin from './EmployeeeLogin';

// import TablePage from './loginData';
import './styles.css';


function MainLoginSignup() {
  return (
    <div>
      <div className="app">
        <nav>
          <ul>
            <li><Link to="/UserSignup">User Signup/Login</Link></li>
            <li><Link to="/companySignup">Company Signup/Login</Link></li>
            <li><Link to="/employeeSignup">Employee Signup/Login</Link></li>
            <li><Link to="/table">View Data</Link></li>
          </ul>
        </nav>
      </div>

      {/* <Router>
        <div className="app">
          <nav>
            <ul>
              <li><Link to="/">User Signup/Login</Link></li>
              <li><Link to="/company">Company Signup/Login</Link></li>
              <li><Link to="/employee">Employee Signup/Login</Link></li>
              <li><Link to="/table">View Data</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<SignupLogin />} />
            <Route path="/company" element={<CompanySignupLogin />} />
            <Route path="/employee" element={<EmployeeSignupLogin />} />
            <Route path="/table" element={<TablePage />} />
          </Routes>
        </div>
      </Router> */}
    </div>

  );
}

export default MainLoginSignup;