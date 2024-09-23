import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FullAddress = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [editIndex, setEditIndex] = useState(null);

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
  }, []);

  const saveToLocalStorage = (updatedAddresses) => {
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCountry || !selectedState || !selectedDistrict || !selectedCity) {
      alert("Please complete all fields");
      return;
    }

    const newAddress = {
      country: selectedCountry.toLowerCase(),
      state: selectedState.toLowerCase(),
      district: selectedDistrict.toLowerCase(),
      city: selectedCity.toLowerCase(),
    };

    const isDuplicate = addresses.some(
      (address) =>
        address.country === newAddress.country &&
        address.state === newAddress.state &&
        address.district === newAddress.district &&
        address.city === newAddress.city
    );

    if (isDuplicate) {
      alert("This address already exists!");
      return;
    }

    if (editIndex !== null) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editIndex] = newAddress;
      setAddresses(updatedAddresses);
      saveToLocalStorage(updatedAddresses);
      setEditIndex(null);
    } else {
      const updatedAddresses = [...addresses, newAddress];
      setAddresses(updatedAddresses);
      saveToLocalStorage(updatedAddresses);
    }
    setSelectedCountry("");
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedCity("");
  };

  const handleEdit = (index) => {
    if (window.confirm("Do You Want To Edit This Data ?")) {
      setSelectedCountry(addresses[index].country);
      setSelectedState(addresses[index].state);
      setSelectedDistrict(addresses[index].district);
      setSelectedCity(addresses[index].city);
      setEditIndex(index);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Do You Want To Delete This Data ?")) {
      const updatedAddresses = addresses.filter((_, i) => i !== index);
      setAddresses(updatedAddresses);
      saveToLocalStorage(updatedAddresses);
    }
  };

  const filteredStates = states.filter(
    (state) => state.country.toLowerCase() === selectedCountry.toLowerCase()
  );

  const filteredDistricts = districts.filter(
    (district) =>
      district.country.toLowerCase() === selectedCountry.toLowerCase() &&
      district.state.toLowerCase() === selectedState.toLowerCase()
  );

  const filteredCities = cities.filter(
    (city) =>
      city.country.toLowerCase() === selectedCountry.toLowerCase() &&
      city.state.toLowerCase() === selectedState.toLowerCase() &&
      city.district.toLowerCase() === selectedDistrict.toLowerCase()
  );

  return (
    <div>
      <section className="get-in-touch">
        <h1 className="title">{editIndex !== null ? 'Edit Your Address' : 'Add Your Address'}</h1>
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

          <div className="form-field col-lg-6">
            <label htmlFor="DistrictName">District:</label>
            <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} required>
              <option className="input-text js-input">--Select Your District--</option>
              {filteredDistricts.map((district, index) => (
                <option key={index} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field col-lg-6">
            <label htmlFor="Citys">City:</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} required>
              <option className="input-text js-input">--Select Your City--</option>
              {filteredCities.map((city, index) => (
                <option key={index} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
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
              <th>City</th>
              <th>District</th>
              <th>State</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {addresses.length > 0 ? (
              addresses.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.city}</td>
                  <td>{item.district}</td>
                  <td>{item.state}</td>
                  <td>{item.country}</td>
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

export default FullAddress;