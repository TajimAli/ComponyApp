import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const EmployeeTable = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('addresses')) || [];
        setData(storedData);
    }, []);

    const handleSearch = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const filteredData = data.filter((item) => {
            const itemDate = new Date(item.currentDate);
            return itemDate >= start && itemDate <= end;
        });

        setData(filteredData);
    };

    const handleDelete = (index) => {
        if (window.confirm("Do you want to delete this data?")) {
            const updatedData = data.filter((_, i) => i !== index);
            localStorage.setItem('addresses', JSON.stringify(updatedData));
            setData(updatedData);
        }
    };

    return (
        <div>
            <h1>EMPLOYEE INFORMATION TABLE</h1>
            <div className="container_Table">
                <button onClick={() => navigate('/EmployeeForm')} className='btn btn-secondary' style={{ marginRight: '80%' }}>Add New Employee</button>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label>Start Date:</label>
                        <input type="date" value={startDate} className="form-control" onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="form-group col-md-3">
                        <label>End Date:</label>
                        <input type="date" value={endDate} className="form-control" onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <button onClick={handleSearch} className='btn btn-primary'>Search</button>
                </div>
            </div>

            <div className="tableData">
                <table border="1" className="table" style={{ width: '200px', marginLeft: '17%' }}>
                    {/* className="table table-striped table-bordered" */}
                    <thead className="thead-dark">
                        <tr>
                            <th>No.</th>
                            <th>Employee ID</th>
                            <th>Full Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            {/* <th>Date of Birth</th> */}
                            {/* <th>Registration Date</th>
                            <th>Relative Person</th>
                            <th>relative Person Contect</th>
                            <th>Relation</th> */}
                            {/* <th>Gender</th> */}
                            <th>Resume</th>
                            <th>Department</th>
                            {/* <th>Position</th> */}
                            {/* <th>Working Days</th>
                            <th>Weekend</th>
                            <th>HTML+CSS Ex</th>
                            <th>React Ex</th>
                            <th>JavaScript Ex</th>
                            <th>.Net EX</th>
                            <th>Python Ex</th>
                            <th>Java Ex</th>
                            <th>Other Ex</th>
                            <th>About Exprience</th>
                            <th>Previous Company</th>
                            <th>Current City</th>
                            <th>Current District</th>
                            <th>Current State</th>
                            <th>Current Country</th>
                            <th>Current Pin Code</th>
                            <th>Area, Building Name & No.</th>
                            <th>Permanent City</th>
                            <th>Permanent District</th>
                            <th>Permanent State</th>
                            <th>Permanent Country</th> */}
                            {/* <th>Permanent Pin Code</th>
                            <th>Area, Building Name & No.</th> */}
                            {/* <th>Title</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.employeeid}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.number}</td>
                                    <td>{item.email}</td>
                                    {/* <td>{item.dob}</td> */}
                                    {/* <td>{item.currentDate}</td>
                                    <td>{item.relativePerson}</td>
                                    <td>{item.relativePersonContect}</td>
                                    <td>{item.relation}</td> */}
                                    {/* <td>{item.gender}</td> */}
                                    <td>{item.file}</td>
                                    <td>{item.department}</td>
                                    {/* <td>{item.position}</td> */}
                                    {/* <td>{item.workingdays}</td>
                                    <td>{item.weekEnd}</td>
                                    <td>{item.htmlcssEx}</td>
                                    <td>{item.reactEx}</td>
                                    <td>{item.javascriptEx}</td>
                                    <td>{item.dotNet}</td>
                                    <td>{item.pythonEx}</td>
                                    <td>{item.javaEx}</td>
                                    <td>{item.otherEx}</td>
                                    <td>{item.aboutExprience}</td>
                                    <td>{item.previousCompany}</td>
                                    <td>{item.city}</td>
                                    <td>{item.district}</td>
                                    <td>{item.state}</td>
                                    <td>{item.country}</td>
                                    <td>{item.pinCode}</td>
                                    <td>{item.currentAddress}</td>
                                    <td>{item.pcity}</td>
                                    <td>{item.pdistrict}</td>
                                    <td>{item.pstate}</td>
                                    <td>{item.pcountry}</td> */}
                                    {/* <td>{item.permanentPinCode}</td>
                                    <td>{item.permanentAddress}</td> */}
                                    {/* <td>{item.title}</td> */}
                                    <td>
                                        <Link to={`/editform/${index}`} className='edit'>Edit</Link>
                                        <Link onClick={() => handleDelete(index)} className='Delete'>Delete</Link>
                                        <Link to={`/showdata/${index}`} className='Delete'>More</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default EmployeeTable;

