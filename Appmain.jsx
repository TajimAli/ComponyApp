import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CountryAndTAble from "./Country";
import StateAndTable from "./state";
import DistrictAndTable from "./district";
import CityAndTable from "./city";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeData";
import FullAddress from "./FullAddress";
import UserDetails from "./showDetails";


// function Appmain() {
//   return (
//     <Router>
//       {/* <nav>
//         <ul>
//           <li><Link to="/">Countrys</Link></li>
//           <li><Link to="/state">States</Link></li>
//           <li><Link to="/district">Districts</Link></li>
//           <li><Link to="/city">Citys</Link></li>
//           <li><Link to="/EnterLocation">Enter Full Address</Link></li>
//         </ul>
//       </nav> */}

//       <nav className="sidebar">
//         <Link to={'/'} className="active">Home</Link>
//         <Link to={'/Country'}>Country</Link>
//         <Link to={'/state'}>State</Link>
//         <Link to={'/district'}>District</Link>
//         <Link to={'/city'}>City</Link>
//         <Link to={'/EnterLocation'}>Full Address</Link>
//         <Link to={'/EmployeeData'}>Employee Table</Link>
//       </nav>
//       <div id="content">
//         <div className="container-fluid">
//           <h1 >Address Application</h1>
//         </div>
//       </div>


//       <Routes>
//         <Route path="/Country" element={<CountryAndTAble />} />
//         <Route path="/state" element={<StateAndTable />} />
//         <Route path="/district" element={<DistrictAndTable />} />
//         <Route path="/city" element={<CityAndTable />} />
//         <Route path="/EnterLocation" element={<EmployeeForm />} />
//         <Route path="/editform/:index" element={<EmployeeForm />} />
//         {/* <Route path="/Employee" element={<EmployeeTable />} /> */}
//         <Route path="/EmployeeData" element={<EmployeeTable />} />
//         <Route path="EmployeeForm" element={<EmployeeForm />} />
//       </Routes>
//     </Router>
//   );
// }

// export default Appmain;



function Appmain() {
  return (
    <div>
      <Router>
        <NavLinks />
        <Routes>
          <Route path="/Country" element={<CountryAndTAble />} />
          <Route path="/state" element={<StateAndTable />} />
          <Route path="/district" element={<DistrictAndTable />} />
          <Route path="/city" element={<CityAndTable />} />
          <Route path="/EnterLocation" element={<EmployeeForm />} />
          <Route path="/editform/:index" element={<EmployeeForm />} />

          <Route path="/Employee" element={<EmployeeTable />} />
          <Route path="/EmployeeData" element={<EmployeeTable />} />
          <Route path="/FullAddress" element={<FullAddress />} />
          <Route path="EmployeeForm" element={<EmployeeForm />} />
          <Route path="/showdata/:index" element={<UserDetails />} />
          {/* <Route path="/showdata/:index" element={<EmployeeForm />} /> */}
        </Routes>
      </Router>

    </div>
  );
}

function NavLinks() {
  return (
    <nav className="sidebar">
      <Link to={'/'} className="active">Dashboard</Link>
      <Link to={'/Country'}>Country</Link>
      <Link to={'/state'}>State</Link>
      <Link to={'/district'}>District</Link>
      <Link to={'/city'}>City</Link>
      <Link to={'/FullAddress'}>Show Address</Link>
      <Link to={'/EnterLocation'}>Fill Form</Link>
      <Link to={'/EmployeeData'}>Employee Table</Link>
    </nav>
  );
}
export default Appmain;