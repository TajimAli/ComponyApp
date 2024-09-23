import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StateAndTable = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [stateName, setStateName] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedCountries = JSON.parse(localStorage.getItem("countries")) || [];
    setCountries(storedCountries);

    const storedStates = JSON.parse(localStorage.getItem("states")) || [];
    setStates(storedStates);
  }, []);

  const saveToLocalStorage = (updatedStates) => {
    localStorage.setItem("states", JSON.stringify(updatedStates));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCountry) {
      alert("Please select a country");
      return;
    }

    const newState = {
      country: selectedCountry.toLowerCase(),
      name: stateName.trim().toLowerCase(),
      code: stateCode.trim().toLowerCase(),
    };

    const isDuplicate = states.some(
      (state) =>
        (state.name.toLowerCase() === newState.name.toLowerCase() && state.country === newState.country) ||
        (state.code.toLowerCase() === newState.code.toLowerCase() && state.country === newState.country)
    );

    if (isDuplicate) {
      alert("Duplicate state name or code in the selected country!");
      return;
    }

    if (editIndex !== null) {
      const updatedStates = [...states];
      updatedStates[editIndex] = newState;
      setStates(updatedStates);
      saveToLocalStorage(updatedStates);
      setEditIndex(null);
    } else {
      const updatedStates = [...states, newState];
      setStates(updatedStates);
      saveToLocalStorage(updatedStates);
    }

    setStateName("");
    setStateCode("");
  };

  const handleEdit = (index) => {
    if (window.confirm("Do You Want To Edit This Data ?")) {
      setStateName(states[index].name);
      setStateCode(states[index].code);
      setEditIndex(index);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Do You Want To Delete This Data ?")) {
      const updatedStates = states.filter((_, i) => i !== index);
      setStates(updatedStates);
      saveToLocalStorage(updatedStates);
    }
  };

  return (
    <div>
      <section className="get-in-touch">
        <h1 className="title">{editIndex !== null ? 'Edit State' : 'Add Your State'}</h1>
        <form className="contact-form row" onSubmit={handleSubmit}>
          <div className="form-field col-lg-6">
            <label htmlFor="countryName">Country:</label>
            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} required>
              <option className="input-text js-input">--Select Your Country--</option>
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field col-lg-6">
            <input type="text" value={stateName} onChange={(e) => setStateName(e.target.value)} required className="input-text js-input" />
            <label className="label" htmlFor="stateName">State:</label>
          </div>
          <div className="form-field col-lg-6 ">
            <input type="text" value={stateCode} onChange={(e) => setStateCode(e.target.value)} required className="input-text js-input" />
            <label className="label" htmlFor="stateCode">State Code:</label>
          </div>
          <div className="form-field col-lg-12">
            {/* <input className="submit-btn" type="submit" value="Submit" /> */}
            <button className="submit-btn" defaultValue="Submit" type="submit">{editIndex !== null ? 'Update' : 'Submit'}</button>
          </div>
        </form>
      </section>

      <div className="tableData">
        <table border="1" class="table" style={{ width: '700px', marginLeft: '20%' }}>
          <thead class="thead-dark">
            <tr>
              <th>No.</th>
              <th>State Name</th>
              <th>State Code</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {states.length > 0 ? (
              states.map((state, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{state.name}</td>
                  <td>{state.code}</td>
                  <td>{state.country}</td>
                  <td>
                    <Link onClick={() => handleEdit(index)} className='edit'>Edit</Link>
                    <Link onClick={() => handleDelete(index)} className='Delete'>Delete</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>No data Available</tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StateAndTable;