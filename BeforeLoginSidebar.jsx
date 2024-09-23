import { Link } from "react-router-dom";

function BeforeLogin() {
    return (
        <div>
            <nav className="sidebar2">
                <Link to="/" className="active"><>EMPLOYEE APPLICATION</></Link>
                <div className="Pages">
                    <Link to="/" className="allPages">Home</Link>
                    <Link to="/" className="allPages">About Us</Link>
                    <Link to="/" className="allPages">Services</Link>
                    <Link to="/" className="allPages">Privacy Policy</Link>
                    <Link to="/" className="allPages">Contact</Link>

                    <div className="nav navbar-nav navbar-right" style={{ marginRight: "15%" }}>
                        <div>
                            <Link to="/loginSignupPage" className="allPages">
                                <span className="glyphicon glyphicon-log-in" />Login</Link>
                        </div>

                    </div>
                </div>
            </nav>

            <div className="container" style={{ width: "100%" }}>
                <h1>WELCOME TO OUR COMPANY</h1>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam error accusantium ab modi, delectus
                    impedit, quaerat numquam
                    molestiae culpa at reprehenderit sed eius totam maiores praesentium doloribus ad maxime iusto?
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt aspernatur rem vero enim
                    deleniti. Suscipit, tenetur voluptatem dolore beatae sequi, rerum saepe ut, voluptatum nobis
                    expedita sapiente exercitationem ipsum est.
                </h4>
            </div>

        </div>
    )
}
export default BeforeLogin;