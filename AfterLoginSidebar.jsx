import { Link, useNavigate } from "react-router-dom";

function AfterLogin(setIsLoggedIn) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        navigate('/login');
    };


    return (
        <nav className="sidebar">
            <Link to="/dashbord" className="active">Dashboard</Link>
            <Link to="/Country" >Country</Link>
            <Link to="/state" >State</Link>
            <Link to="/district" >District</Link>
            <Link to="/city" >City</Link>
            <Link to="/FullAddress" >Show Address</Link>
            <Link to="/EnterLocation">Fill Form</Link>
            <Link to="/EmployeeData">Employee Table</Link>

            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
    )
}
export default AfterLogin;