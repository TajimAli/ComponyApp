import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import BeforeLogin from "./BeforeLoginSidebar";
import AfterLogin from "./AfterLoginSidebar";

import MainLoginSignup from "./LoginAndSignup/mainLoginSignup";
import UserLogin from "./LoginAndSignup/UserLogin"
import CompanySignupLogin from "./LoginAndSignup/CompanyLogin";
import EmployeeSignupLogin from "./LoginAndSignup/EmployeeeLogin"

import CountryAndTAble from "./Country";
import StateAndTable from "./state";
import DistrictAndTable from "./district";
import CityAndTable from "./city";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeData";
import FullAddress from "./FullAddress";
import UserDetails from "./showDetails";




function MainNavbar() {
    // const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // ------Check already logged in------
    useEffect(() => {
        const loggedInStatus = localStorage.getItem('userData');
        if (loggedInStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            <div className="app-container">
                {!isLoggedIn ? (
                    <BeforeLogin />
                ) : (
                    <AfterLogin setIsLoggedIn={setIsLoggedIn} />
                )}

                <div className="content-container">
                    <Routes>
                        {!isLoggedIn ? (
                            <>
                                {/* <Route exact path="/" element={<BeforeLogin />} /> */}
                                <Route path="/loginSignupPage" element={<MainLoginSignup />} />

                                {/* <Route path="/loginSignupPage" element={<MainLoginSignup />} /> */}
                                <Route path="/UserSignup" element={<UserLogin setIsLoggedIn={setIsLoggedIn} />} />
                                <Route path="/companySignup" element={<CompanySignupLogin />} />
                                <Route path="/employeeSignup" element={<EmployeeSignupLogin />} />
                                {/* <Route path="*" element={<Navigate to="/login" />} /> */}
                            </>
                        ) : (
                            <>
                                <Route path="/dashbord" element={<AfterLogin />} />
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
                                <Route path="*" element={<Navigate to="/dashbord" />} />
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        </Router>

    );
}
export default MainNavbar;





// return (
//     <div>
//         <Router>
//             <Routes>
//                 <Route exact path="/" element={<BeforeLogin />} />
//                 <Route path="/loginSignupPage" element={<MainLoginSignup />} />
//                 <Route path="/UserSignup" element={<UserLogin />} />
//                 <Route path="/companySignup" element={<CompanySignupLogin />} />
//                 <Route path="/employeeSignup" element={<EmployeeSignupLogin />} />
//                 {/*<Route path="*" element={<Navigate to="/" />} /> */}
//             </Routes>
//         </Router>





{/* <Router>
                <nav className="sidebar2">
                    <Link to={'/'} className="active"><>EMPLOYEE APPLICATION</></Link>
                    <div className="Pages">
                        <Link to={'/'} className="allPages">Home</Link>
                        <Link to={'/'} className="allPages">About Us</Link>
                        <Link to={'/'} className="allPages">Services</Link>
                        <Link to={'/'} className="allPages">Privacy Policy</Link>
                        <Link to={'/'} className="allPages">Contact</Link>

                        <div className="nav navbar-nav navbar-right" style={{ marginRight: "15%" }}>
                            <div>
                                <Link to={'loginSignupPage'} className="allPages">
                                    <span className="glyphicon glyphicon-log-in" />Login</Link>
                            </div>

                        </div>
                    </div>
                </nav>

                <div className="container" style={{ width: "100%" }}>
                    <h1>WELCOME TO OUR COMPANY</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam error accusantium ab modi, delectus
                        impedit, quaerat numquam
                        molestiae culpa at reprehenderit sed eius totam maiores praesentium doloribus ad maxime iusto?
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt aspernatur rem vero enim
                        deleniti. Suscipit, tenetur voluptatem dolore beatae sequi, rerum saepe ut, voluptatum nobis
                        expedita sapiente exercitationem ipsum est.
                    </p>
                </div>
                <Routes>
                    <Route path="/loginSignupPage" element={<MainLoginSignup />} />
                    <Route path="/loginSignupPage" element={<MainLoginSignup />} />
                    <Route path="/loginSignupPage" element={<MainLoginSignup />} />
                    <Route path="/loginSignupPage" element={<MainLoginSignup />} />
                </Routes>
            </Router> */}

// </div>
//     );
// }

// export default MainNavbar;