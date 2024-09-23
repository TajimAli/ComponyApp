import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeForm = () => {
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

    const [errors, setErrors] = useState({});

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

    const saveToLocalStorage = (updatedAddresses) => {
        localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployees({
            ...employees,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateError(employees);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const newAddress = {
            country: selectedCountry.toLowerCase(),
            state: selectedState.toLowerCase(),
            district: selectedDistrict.toLowerCase(),
            city: selectedCity.toLowerCase(),

            pcountry: permanentCountry.toLowerCase(),
            pstate: permanentState.toLowerCase(),
            pdistrict: permanentDistrict.toLowerCase(),
            pcity: permanentdCity.toLowerCase(),
            ...employees,
        };

        // const isDuplicate = addresses.some(
        //     (address, idx) =>
        //         idx !== Number(index) &&
        //         address.country === newAddress.country &&
        //         address.state === newAddress.state &&
        //         address.district === newAddress.district &&
        //         address.city === newAddress.city
        // );

        // if (isDuplicate) {
        //     alert("This address already exists!");
        //     return;
        // }

        let updatedAddresses;
        if (index !== undefined) {
            updatedAddresses = addresses.map((address, idx) =>
                idx === Number(index) ? newAddress : address
            );
        } else {
            updatedAddresses = [...addresses, newAddress];
        }
        setAddresses(updatedAddresses);
        saveToLocalStorage(updatedAddresses);

        navigate('/Employee');
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

    const validateError = (data) => {
        const errors = {};

        if (!data.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = "Email is not valid";
        }

        if (!data.number) {
            errors.number = "Number is required";
        } else if (data.number.length !== 10) {
            errors.number = "Number should be 10 digits long";
        }

        if (!data.fullName.trim()) {
            errors.fullName = "First Name is required";
        } else if (data.fullName.length < 4) {
            errors.fullName = "Full Name must be at least 4 characters long";
        }

        if (data.dob) {
            const today = new Date();
            const dobDate = new Date(data.dob);
            const age = today.getFullYear() - dobDate.getFullYear();
            const monthDiff = today.getMonth() - dobDate.getMonth();
            const dayDiff = today.getDate() - dobDate.getDate();

            if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
                errors.dob = "You must be at least 18 years old";
            } else if (age > 90 || (age === 90 && (monthDiff > 0 || (monthDiff === 0 && dayDiff > 0)))) {
                errors.dob = "You must be maximum 90 years old";
            }
        }
        return errors;
    };

    const ResetFun = () => {
        setEmployees({
            employeeid: "", fullName: "", number: "", email: "", dob: "", currentDate: "", relativePerson: "",
            relativePersonContect: "", relation: "", gender: "", filename: "", department: "", position: "", workingdays: "",
            weekEnd: "", htmlcssEx: "", reactEx: "", javascriptEx: "", dotNet: "", pythonEx: "", javaEx: "", otherEx: "",
            aboutExprience: "", previousCompany: "", pinCode: "", currentAddress: "", permanentPinCode: "", permanentAddress: "", title: "",
        });
        setSelectedCountry("");
        setSelectedState("");
        setSelectedDistrict("");
        setSelectedCity("");

        setPermanentCountry("");
        setPermanentState("");
        setPermanentDistrict("");
        setPermanentdCity("");
    };

    return (
        <div className="container">
            <h1>{index !== undefined ? 'Edit Your Information' : 'Employee Information'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="employeeid">Employee ID:</label>
                        <input type="text" name="employeeid" value={employees.employeeid} placeholder="Enter Employee ID" className="form-control" onChange={handleChange} />
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" name="fullName" value={employees.fullName} placeholder="Enter Full Name" className="form-control" onChange={handleChange} required />
                        {errors.fullName &&
                            <span className="error-message">
                                {errors.fullName}
                            </span>}
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="number">Contact Number:</label>
                        <input type="text" name="number" value={employees.number} placeholder="Enter Number" className="form-control" onChange={handleChange} required />
                        {errors.number &&
                            <span className="error-message">
                                {errors.number}
                            </span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" value={employees.email} placeholder="Enter Email" className="form-control" onChange={handleChange} required />
                        {errors.email &&
                            <span className="error-message">
                                {errors.email}
                            </span>}
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="dob">Date Of Birth:</label>
                        <input type="date" name="dob" value={employees.dob} className="form-control" onChange={handleChange}
                            max={new Date().toISOString().split('T')[0]} />
                        {errors.dob &&
                            <span className="error-message">
                                {errors.dob}
                            </span>}
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="currentDate">Today's Date:</label>
                        <input type="date" name="currentDate" value={employees.currentDate} className="form-control" onChange={handleChange} />
                    </div>
                </div>
                <div className="form-row">
                    <label htmlFor="relativePerson">Relative Person Information:</label>
                    <div className="form-group col-md-4">
                        {/* <label htmlFor="relativePerson">Relative Person Information:</label> */}
                        <input type="relativePerson" name="relativePerson" value={employees.relativePerson} placeholder="Relative Person Name" className="form-control" onChange={handleChange} required />
                    </div>

                    <div className="form-group col-md-4">
                        {/* <label htmlFor="dob">Relative Person Contect:</label> */}
                        <input type="relativePersonContect" name="relativePersonContect" value={employees.relativePersonContect} placeholder='Relative Person Contect No.' className="form-control" onChange={handleChange} />
                    </div>

                    <div className="form-group col-md-4">
                        {/* <label htmlFor="currentDate">What is the Relation:</label> */}
                        <input type="relation" name="relation" value={employees.relation} placeholder='What is the Relation ?' className="form-control" onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="gender">Select Gender</label>
                        <select name="gender" value={employees.gender} id="gender" className="form-control" onChange={handleChange}>
                            <option value="gender">--Select Gender--</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="file">Uploade Resume</label>
                        <input type="file" name="file" value={employees.file} placeholder="Uploade Resume" className="form-control" onChange={handleChange} required />
                    </div>

                    <div className="form-field col-lg-4">
                        <label htmlFor="department">Department:</label>
                        <select name="department" value={employees.department} id="department" className="form-control" onChange={handleChange}>
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
                        <select name="position" value={employees.position} id="department" className="form-control" onChange={handleChange}>
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
                        <select name="workingdays" value={employees.workingdays} id="workingdays" className="form-control" onChange={handleChange}>
                            <option value="workingdays">--Working Days--</option>
                            <option value="mondayTofriday">Monday To Friday</option>
                            <option value="mondayToSaturday">Monday To Saturday</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="weekEnd">Working On Weekend?</label>
                        <select name="weekEnd" value={employees.weekEnd} className="form-control" onChange={handleChange}>
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
                        {/* <label htmlFor="htmlcssEx">Exprience in HTML,CSS?</label> */}
                        <input type="htmlcssEx" name="htmlcssEx" value={employees.htmlcssEx} className="form-control" placeholder="Exprience in HTML,CSS" onChange={handleChange} />
                    </div>

                    <div className="form-group col-md-4">
                        {/* <label htmlFor="reactEx">Exprience in React?</label> */}
                        <input type="reactEx" name="reactEx" value={employees.reactEx} className="form-control" placeholder="Exprience in React" onChange={handleChange} />
                    </div>

                    <div className="form-group col-md-4">
                        {/* <label htmlFor="javascriptEx">Exprience in JavaScript?</label> */}
                        <input type="javascriptEx" name="javascriptEx" value={employees.javascriptEx} className="form-control" placeholder="Exprience in JavaScript" onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        {/* <label htmlFor="pythonEx">Exprience in .Net?</label> */}
                        <input type="dotNet" name="dotNet" value={employees.dotNet} className="form-control" placeholder="Exprience in .Net" onChange={handleChange} />
                    </div>

                    <div className="form-group col-md-4">
                        {/* <label htmlFor="pythonEx">Exprience in Python?</label> */}
                        <input type="pythonEx" name="pythonEx" value={employees.pythonEx} className="form-control" placeholder="Exprience in Python" onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-4">
                        {/* <label htmlFor="javaEx">Exprience in Java?</label> */}
                        <input type="javaEx" name="javaEx" value={employees.javaEx} className="form-control" placeholder="Exprience in javaEx" onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="otherEx">Exprience in Other Language?</label>
                        <input type="otherEx" name="otherEx" value={employees.otherEx} className="form-control" placeholder="Exprience in other Language" onChange={handleChange} />
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="otherEx">Explain About Your Exprience</label>
                        <input type="aboutExprience" name="aboutExprience" value={employees.aboutExprience} className="form-control" placeholder="Write About Your Exprience" onChange={handleChange} />
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="otherEx">Previous Company Name ?</label>
                        <input type="previousCompany" name="previousCompany" value={employees.previousCompany} className="form-control" placeholder=" Previous Company Name ?" onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <label htmlFor="countryName">Fill Your Current Address:</label>
                    <div className="form-field col-lg-4">
                        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="form-control" required>
                            <option value="">--Select Your Country--</option>
                            {countries.map((country, idx) => (
                                <option key={idx} value={country.name}>{country.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-field col-lg-4">
                        {/* <label htmlFor="stateName">State:</label> */}
                        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="form-control" required>
                            <option value="">--Select Your State--</option>
                            {filteredStates.map((state, idx) => (
                                <option key={idx} value={state.name}>{state.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-field col-lg-4">
                        {/* <label htmlFor="districtName">District:</label> */}
                        <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="form-control" required>
                            <option value="">--Select Your District--</option>
                            {filteredDistricts.map((district, idx) => (
                                <option key={idx} value={district.name}>{district.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-field col-lg-4">
                        {/* <label htmlFor="cityName">City:</label> */}
                        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="form-control" required>
                            <option value="">--Select Your City--</option>
                            {filteredCities.map((city, idx) => (
                                <option key={idx} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        {/* <label htmlFor="pinCode">Pin Code:</label> */}
                        <input type="pinCode" name="pinCode" value={employees.pinCode} placeholder="Enter Pin Code" className="form-control" onChange={handleChange} />
                    </div>

                    <div className="form-group col-md-4">
                        {/* <label htmlFor="currentAddress">Area, Building Name & No.</label> */}
                        <input type="text" name="currentAddress" value={employees.currentAddress} placeholder="Area, Building Name & No." className="form-control" onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <label htmlFor="countryName">Fill Your Permanent Address:</label>
                    <div className="form-field col-lg-4">
                        <select value={permanentCountry} onChange={(e) => setPermanentCountry(e.target.value)} className="form-control" required>
                            <option value="">--Select Your Country--</option>
                            {countries.map((pcountry, idx) => (
                                <option key={idx} value={pcountry.name}>{pcountry.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-field col-lg-4">
                        {/* <label htmlFor="stateName">State:</label> */}
                        <select value={permanentState} onChange={(e) => setPermanentState(e.target.value)} className="form-control" required>
                            <option value="">--Select Your State--</option>
                            {filtereStates.map((pstate, idx) => (
                                <option key={idx} value={pstate.name}>{pstate.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-field col-lg-4">
                        {/* <label htmlFor="districtName">District:</label> */}
                        <select value={permanentDistrict} onChange={(e) => setPermanentDistrict(e.target.value)} className="form-control" required>
                            <option value="">--Select Your District--</option>
                            {filtereDistricts.map((pdistrict, idx) => (
                                <option key={idx} value={pdistrict.name}>{pdistrict.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-field col-lg-4">
                        {/* <label htmlFor="cityName">City:</label> */}
                        <select value={permanentdCity} onChange={(e) => setPermanentdCity(e.target.value)} className="form-control" required>
                            <option value="">--Select Your City--</option>
                            {filtereCities.map((pcity, idx) => (
                                <option key={idx} value={pcity.name}>{pcity.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        {/* <label htmlFor="pinCode">Pin Code:</label> */}
                        <input type="permanentPinCode" name="permanentPinCode" value={employees.permanentPinCode} placeholder="Enter Pin Code" className="form-control" onChange={handleChange} />
                    </div>

                    <div className="form-group col-md-4">
                        {/* <label htmlFor="currentAddress">Area, Building Name & No.</label> */}
                        <input type="permanentAddress" name="permanentAddress" value={employees.permanentAddress} placeholder="Area, Building Name & No." className="form-control" onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" value={employees.title} placeholder="Enter Title" className="form-control" onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <button type="reset" onClick={ResetFun}>Reset</button>
                    <button type="submit">{index !== undefined ? 'Update' : 'Submit'}</button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
