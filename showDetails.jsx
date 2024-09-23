import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserDetails = () => {
    const { index } = useParams();
    const navigate = useNavigate();

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);
    const [addresses, setAddresses] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const [permanentCountry, setPermanentCountry] = useState("");
    const [permanentState, setPermanentState] = useState("");
    const [permanentDistrict, setPermanentDistrict] = useState("");
    const [permanentdCity, setPermanentdCity] = useState("");

    const [employees, setEmployees] = useState({
        employeeid: "", fullName: "", number: "", email: "", dob: "", currentDate: "", relativePerson: "",
        relativePersonContect: "", relation: "", gender: "", file: "", department: "", position: "", workingdays: "",
        weekEnd: "", htmlcssEx: "", reactEx: "", javascriptEx: "", dotNet: "", pythonEx: "", javaEx: "", otherEx: "",
        aboutExprience: "", previousCompany: "", pinCode: "", currentAddress: "", permanentPinCode: "", permanentAddress: "", title: "",
    });


    useEffect(() => {
        const storedCountries = JSON.parse(localStorage.getItem("countries")) || [];
        setCountries(storedCountries);

        const storedStates = JSON.parse(localStorage.getItem("states")) || [];
        setStates(storedStates);

        const storedDistricts = JSON.parse(localStorage.getItem("districts")) || [];
        setDistricts(storedDistricts);

        const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
        setCities(storedCities);

        const storedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
        setAddresses(storedAddresses);

        // -----editing form with data----------
        if (index !== undefined) {
            const address = storedAddresses[index];
            if (address) {
                setEmployees({
                    employeeid: address.employeeid,
                    fullName: address.fullName,
                    number: address.number,
                    email: address.email,
                    dob: address.dob,
                    currentDate: address.currentDate,
                    relativePerson: address.relativePerson,
                    relativePersonContect: address.relativePersonContect,
                    relation: address.relation,
                    gender: address.gender,
                    filename: address.file,
                    department: address.department,
                    position: address.position,
                    workingdays: address.workingdays,
                    weekEnd: address.weekEnd,
                    htmlcssEx: address.htmlcssEx,
                    reactEx: address.reactEx,
                    javascriptEx: address.javascriptEx,
                    dotNet: address.dotNet,
                    pythonEx: address.pythonEx,
                    javaEx: address.javaEx,
                    otherEx: address.otherEx,
                    aboutExprience: address.aboutExprience,
                    previousCompany: address.previousCompany,
                    pinCode: address.pinCode,
                    currentAddress: address.currentAddress,
                    permanentPinCode: address.permanentPinCode,
                    permanentAddress: address.permanentAddress,
                    title: address.title,
                });
                setSelectedCountry(address.country);
                setSelectedState(address.state);
                setSelectedDistrict(address.district);
                setSelectedCity(address.city);

                setPermanentCountry(address.pcountry);
                setPermanentState(address.pstate);
                setPermanentDistrict(address.pdistrict);
                setPermanentdCity(address.pcity);
            }
        }
    }, [index]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployees({
            ...employees,
            [name]: value,
        });
    };

    const filteredStates = states.filter(
        (state) => state.country.toLowerCase() === selectedCountry.toLowerCase()
    );

    const filteredDistricts = districts.filter((district) =>
        district.country.toLowerCase() === selectedCountry.toLowerCase() &&
        district.state.toLowerCase() === selectedState.toLowerCase()
    );

    const filteredCities = cities.filter((city) =>
        city.country.toLowerCase() === selectedCountry.toLowerCase() &&
        city.state.toLowerCase() === selectedState.toLowerCase() &&
        city.district.toLowerCase() === selectedDistrict.toLowerCase()
    );

    const filtereStates = states.filter(
        (state) => state.country.toLowerCase() === permanentCountry.toLowerCase()
    );

    const filtereDistricts = districts.filter((district) =>
        district.country.toLowerCase() === permanentCountry.toLowerCase() &&
        district.state.toLowerCase() === permanentState.toLowerCase()
    );

    const filtereCities = cities.filter((city) =>
        city.country.toLowerCase() === permanentCountry.toLowerCase() &&
        city.state.toLowerCase() === permanentState.toLowerCase() &&
        city.district.toLowerCase() === permanentDistrict.toLowerCase()
    );

    return (
        <div className="container">
            <h1>Here is Full Data</h1>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="employeeid">Employee ID:</label>
                        <input type="text" name="employeeid" value={employees.employeeid} placeholder="Enter Employee ID" className="form-control" onChange={handleChange} disabled/>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" name="fullName" value={employees.fullName} placeholder="Enter Full Name" className="form-control" onChange={handleChange} disabled />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="number">Contact Number:</label>
                        <input type="text" name="number" value={employees.number} placeholder="Enter Number" className="form-control" onChange={handleChange} disabled />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" value={employees.email} placeholder="Enter Email" className="form-control" onChange={handleChange} disabled />
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="dob">Date Of Birth:</label>
                        <input type="date" name="dob" value={employees.dob} className="form-control" onChange={handleChange} disabled/>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="currentDate">Today's Date:</label>
                        <input type="date" name="currentDate" value={employees.currentDate} className="form-control" onChange={handleChange} disabled/>
                    </div>
                </div>
                <div className="form-row">
                    <label htmlFor="relativePerson">Relative Person Information:</label>
                    <div className="form-group col-md-4">
                        <input type="relativePerson" name="relativePerson" value={employees.relativePerson} className="form-control" onChange={handleChange} disabled />
                    </div>

                    <div className="form-group col-md-4">
                        <input type="relativePersonContect" name="relativePersonContect" value={employees.relativePersonContect} placeholder='Relative Person Contect No.' className="form-control" onChange={handleChange} disabled/>
                    </div>

                    <div className="form-group col-md-4">
                        <input type="relation" name="relation" value={employees.relation} className="form-control" onChange={handleChange} disabled/>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="gender">Select Gender</label>
                        <select name="gender" value={employees.gender} id="gender" className="form-control" onChange={handleChange} disabled>
                            <option value="gender">--Select Gender--</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="file">Uploade Resume</label>
                        <input type="file" name="file" value={employees.file} className="form-control" onChange={handleChange} disabled/>
                    </div>

                    <div className="form-field col-lg-4">
                        <label htmlFor="department">Department:</label>
                        <select name="department" value={employees.department} id="department" className="form-control" onChange={handleChange} disabled>
                            <option value="department">--Select Department--</option>
                            <option value="marketing">Marketing</option>
                            <option value="hr">HR</option>
                            <option value="software_developer">Software Developer</option>
                            <option value="full_stack_web_developer">Web Developer</option>
                            <option value="sales">Sales</option>
                            <option value="finance">Finance</option>
                            <option value="accountent">Accountent</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="position">Position:</label>
                        <select name="position" value={employees.position} id="department" className="form-control" onChange={handleChange} disabled>
                            <option value="position">--Select Position--</option>
                            <option value="companyads">Company Ads</option>
                            <option value="hr">HR Position</option>
                            <option value="senior_software_developer">Senior Software Developer</option>
                            <option value="junior_software_developer">Junior Software Developer</option>
                            <option value="frontEnd_developer">Front-End Developer</option>
                            <option value="Backend developer">Backend Developer</option>
                            <option value="product sales">Product Sales</option>
                            <option value="financeManager">Finance Manager</option>
                            <option value="accountentManager">Accountent Manager</option>
                        </select>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="workingdays">Working Days</label>
                        <select name="workingdays" value={employees.workingdays} id="workingdays" className="form-control" onChange={handleChange} disabled>
                            <option value="workingdays">--Working Days--</option>
                            <option value="mondayTofriday">Monday To Friday</option>
                            <option value="mondayToSaturday">Monday To Saturday</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="weekEnd">Working On Weekend?</label>
                        <select name="weekEnd" value={employees.weekEnd} className="form-control" onChange={handleChange} disabled>
                            <option value="workingdays">--Select Weekend--</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <label htmlFor="htmlcssEx">Fill, How Many Exprience Do You Have ?</label>
                    <div className="form-group col-md-4">
                        <input type="htmlcssEx" name="htmlcssEx" value={employees.htmlcssEx} className="form-control" onChange={handleChange} disabled/>
                    </div>

                    <div className="form-group col-md-4">
                        <input type="reactEx" name="reactEx" value={employees.reactEx} className="form-control" onChange={handleChange} disabled/>
                    </div>

                    <div className="form-group col-md-4">
                        <input type="javascriptEx" name="javascriptEx" value={employees.javascriptEx} className="form-control" onChange={handleChange} disabled/>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <input type="dotNet" name="dotNet" value={employees.dotNet} className="form-control"  onChange={handleChange} disabled/>
                    </div>

                    <div className="form-group col-md-4">
                        <input type="pythonEx" name="pythonEx" value={employees.pythonEx} className="form-control" onChange={handleChange} disabled/>
                    </div>
                    <div className="form-group col-md-4">
                        <input type="javaEx" name="javaEx" value={employees.javaEx} className="form-control" onChange={handleChange} disabled/>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="otherEx">Exprience in Other Language?</label>
                        <input type="otherEx" name="otherEx" value={employees.otherEx} className="form-control" onChange={handleChange} disabled/>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="otherEx">Explain About Your Exprience</label>
                        <input type="aboutExprience" name="aboutExprience" value={employees.aboutExprience} className="form-control" onChange={handleChange} disabled/>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="otherEx">Previous Company Name ?</label>
                        <input type="previousCompany" name="previousCompany" value={employees.previousCompany} className="form-control" onChange={handleChange} disabled/>
                    </div>
                </div>

                <div className="form-row">
                    <label htmlFor="countryName">Fill Your Current Address:</label>
                    <div className="form-field col-lg-4">
                        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="form-control" disabled>
                            <option value="">--Select Your Country--</option>
                            {countries.map((country, idx) => (
                                <option key={idx} value={country.name}>{country.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-field col-lg-4">
                        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="form-control" disabled>
                            <option value="">--Select Your State--</option>
                            {filteredStates.map((state, idx) => (
                                <option key={idx} value={state.name}>{state.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-field col-lg-4">
                        <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="form-control" disabled>
                            <option value="">--Select Your District--</option>
                            {filteredDistricts.map((district, idx) => (
                                <option key={idx} value={district.name}>{district.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-field col-lg-4">
                        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="form-control" disabled>
                            <option value="">--Select Your City--</option>
                            {filteredCities.map((city, idx) => (
                                <option key={idx} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <input type="pinCode" name="pinCode" value={employees.pinCode} className="form-control" onChange={handleChange} disabled/>
                    </div>

                    <div className="form-group col-md-4">
                        <input type="text" name="currentAddress" value={employees.currentAddress} className="form-control" onChange={handleChange} disabled/>
                    </div>
                </div>

                <div className="form-row">
                    <label htmlFor="countryName">Fill Your Permanent Address:</label>
                    <div className="form-field col-lg-4">
                        <select value={permanentCountry} onChange={(e) => setPermanentCountry(e.target.value)} className="form-control" disabled>
                            <option value="">--Select Your Country--</option>
                            {countries.map((pcountry, idx) => (
                                <option key={idx} value={pcountry.name}>{pcountry.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-field col-lg-4">
                        <select value={permanentState} onChange={(e) => setPermanentState(e.target.value)} className="form-control" disabled>
                            <option value="">--Select Your State--</option>
                            {filtereStates.map((pstate, idx) => (
                                <option key={idx} value={pstate.name}>{pstate.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-field col-lg-4">
                        <select value={permanentDistrict} onChange={(e) => setPermanentDistrict(e.target.value)} className="form-control" disabled>
                            <option value="">--Select Your District--</option>
                            {filtereDistricts.map((pdistrict, idx) => (
                                <option key={idx} value={pdistrict.name}>{pdistrict.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-field col-lg-4">
                        <select value={permanentdCity} onChange={(e) => setPermanentdCity(e.target.value)} className="form-control" disabled>
                            <option value="">--Select Your City--</option>
                            {filtereCities.map((pcity, idx) => (
                                <option key={idx} value={pcity.name}>{pcity.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <input type="permanentPinCode" name="permanentPinCode" value={employees.permanentPinCode} className="form-control" onChange={handleChange} disabled/>
                    </div>

                    <div className="form-group col-md-4">
                        <input type="permanentAddress" name="permanentAddress" value={employees.permanentAddress} className="form-control" onChange={handleChange} disabled/>
                    </div>
                </div>


                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" value={employees.title} className="form-control" onChange={handleChange} disabled/>
                    </div>
                </div>


                <div className="form-row">
                    <button type="submit" onClick={() => navigate('/Employee')} style={{marginLeft: '27%'}}>Close</button>
                </div>
            </form>
        </div>
    );
};

export default UserDetails;
