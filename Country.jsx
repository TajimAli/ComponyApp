import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CountryAndTAble = () => {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedCountries = JSON.parse(localStorage.getItem("countries")) || [];
    setCountries(storedCountries);
  }, []);

  const saveToLocalStorage = (updatedCountries) => {
    localStorage.setItem("countries", JSON.stringify(updatedCountries));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCountry = {
      name: countryName.trim().toLowerCase(),
      code: countryCode.trim().toLowerCase(),
    };

    // --------Check for duplicates------------
    const isDuplicate = countries.some(
      (country) =>
        country.name.toLowerCase() === newCountry.name.toLowerCase() ||
        country.code.toLowerCase() === newCountry.code.toLowerCase()
    );

    if (isDuplicate) {
      alert("Duplicate country name or code!");
      return;
    }

    if (editIndex !== null) {
      const updatedCountries = [...countries];
      updatedCountries[editIndex] = newCountry;
      setCountries(updatedCountries);
      saveToLocalStorage(updatedCountries);
      setEditIndex(null);
    } else {
      const updatedCountries = [...countries, newCountry];
      setCountries(updatedCountries);
      saveToLocalStorage(updatedCountries);
    }
    setCountryName("");
    setCountryCode("");
  };

  const handleEdit = (index) => {
    if (window.confirm("Do You Want To Edit This Data ?")) {
      setCountryName(countries[index].name);
      setCountryCode(countries[index].code);
      setEditIndex(index);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Do You Want To Delete This Data?")) {
      const updatedCountries = countries.filter((_, i) => i !== index);
      setCountries(updatedCountries);
      saveToLocalStorage(updatedCountries);
    }
  };

  return (
    <div>
      <section className="get-in-touch">
        {/* <h1 className="title">Add Your Country</h1> */}
        <h1 className="title">{editIndex !== null ? 'Edit Country' : 'Add Your Country'}</h1>
        <form onSubmit={handleSubmit} className="contact-form row">

          <div className="form-field col-lg-6">
            <input type="text" value={countryName} onChange={(e) => setCountryName(e.target.value)} required className="input-text js-input" />
            <label className="label" htmlFor="countryName">Country:</label>
          </div>

          <div className="form-field col-lg-6 ">
            <input type="text" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} required className="input-text js-input" />
            <label className="label" htmlFor="countryCode">Country Code:</label>
          </div>

          <div className="form-field col-lg-12">
            {/* <input className="submit-btn" type="submit" defaultValue="Submit" /> */}
            <button className="submit-btn" defaultValue="Submit" type="submit">{editIndex !== null ? "Update" : "Submit"}</button>
          </div>
        </form>
      </section>

      <div className="tableData">
        <table border="1" class="table" style={{ width: '600px', marginLeft: '20%' }}>
          <thead class="thead-dark">
            <tr>
              <th>No.</th>
              <th>Country Name</th>
              <th>Country Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.length > 0 ? (
              countries.map((country, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{country.name}</td>
                  <td>{country.code}</td>
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

export default CountryAndTAble;