import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DistrictAndTable = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedCountries = JSON.parse(localStorage.getItem("countries")) || [];
    setCountries(storedCountries);

    const storedStates = JSON.parse(localStorage.getItem("states")) || [];
    setStates(storedStates);

    const storedDistricts = JSON.parse(localStorage.getItem("districts")) || [];
    setDistricts(storedDistricts);
  }, []);

  const saveToLocalStorage = (updatedDistricts) => {
    localStorage.setItem("districts", JSON.stringify(updatedDistricts));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCountry || !selectedState) {
      alert("Please select a country and state");
      return;
    }

    const newDistrict = {
      country: selectedCountry.toLowerCase(),
      state: selectedState.toLowerCase(),
      name: districtName.trim().toLowerCase(),
    };

    const isDuplicate = districts.some(
      (district) =>
        district.name.toLowerCase() === newDistrict.name.toLowerCase() &&
        district.country === newDistrict.country &&
        district.state === newDistrict.state
    );

    if (isDuplicate) {
      alert("Duplicate district name in the selected country and state!");
      return;
    }

    if (editIndex !== null) {
      const updatedDistricts = [...districts];
      updatedDistricts[editIndex] = newDistrict;

      setDistricts(updatedDistricts);
      saveToLocalStorage(updatedDistricts);
      setEditIndex(null);
    } else {
      const updatedDistricts = [...districts, newDistrict];
      setDistricts(updatedDistricts);
      saveToLocalStorage(updatedDistricts);
    }
    setDistrictName("");
    setSelectedCountry("");
    setSelectedState("");
  };

  const handleEdit = (index) => {
    if (window.confirm("Do You Want To Edit This Data ?")) {
      setSelectedCountry(districts[index].country);
      setSelectedState(districts[index].state);
      setDistrictName(districts[index].name);
      setEditIndex(index);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Do You Want To Delete This Data")) {
      const updatedDistricts = districts.filter((_, i) => i !== index);
      setDistricts(updatedDistricts);
      saveToLocalStorage(updatedDistricts);
    }
  };

  const filteredStates = states.filter(
    (state) => state.country.toLowerCase() === selectedCountry.toLowerCase()
  );

  return (
    <div>
      <section className="get-in-touch">
        <h1 className="title">{editIndex !== null ? 'Edit District' : 'Add Your District'}</h1>
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
            <label htmlFor="stateName">State:</label>
            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} required>
              <option className="input-text js-input">--Select Your State--</option>
              {filteredStates.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field col-lg-6 ">
            <input type="text" value={districtName} onChange={(e) => setDistrictName(e.target.value)} required className="input-text js-input" />
            <label className="label" htmlFor="District">District:</label>
          </div>
          <div className="form-field col-lg-12">
            <button className="submit-btn" defaultValue="Submit" type="submit">{editIndex !== null ? 'Update' : 'Submit'}</button>
          </div>
        </form>
      </section>

      <div className="tableData">
        <table border="1" class="table" style={{ width: '800px', marginLeft: '20%' }}>
          <thead class="thead-dark">
            <tr>
              <th>No.</th>
              <th>District</th>
              <th>State</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {districts.length > 0 ? (
              districts.map((district, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{district.name}</td>
                  <td>{district.state}</td>
                  <td>{district.country}</td>
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

export default DistrictAndTable;