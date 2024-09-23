import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CityAndTable = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [cityName, setCityName] = useState("");
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
  }, []);

  const saveToLocalStorage = (updatedCities) => {
    localStorage.setItem("cities", JSON.stringify(updatedCities));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCountry || !selectedState || !selectedDistrict) {
      alert("Please select a country, state, and district");
      return;
    }

    const newCity = {
      country: selectedCountry.toLowerCase(),
      state: selectedState.toLowerCase(),
      district: selectedDistrict.toLowerCase(),
      name: cityName.trim().toLowerCase(),
    };

    const isDuplicate = cities.some(
      (city) =>
        city.name.toLowerCase() === newCity.name.toLowerCase() &&
        city.country === newCity.country &&
        city.state === newCity.state &&
        city.district === newCity.district
    );

    if (isDuplicate) {
      alert("Duplicate city name in the selected country, state, and district!");
      return;
    }

    if (editIndex !== null) {
      const updatedCities = [...cities];
      updatedCities[editIndex] = newCity;
      setCities(updatedCities);
      saveToLocalStorage(updatedCities);
      setEditIndex(null);
    } else {
      const updatedCities = [...cities, newCity];
      setCities(updatedCities);
      saveToLocalStorage(updatedCities);
    }
    setCityName("");
  };

  const handleEdit = (index) => {
    if (window.confirm("Do You Want To Edit This Data ?")) {
      setSelectedCountry(cities[index].country);
      setSelectedState(cities[index].state);
      setSelectedDistrict(cities[index].district);
      setCityName(cities[index].name);
      setEditIndex(index);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Do You Want To Delete This Data ?")) {
      const updatedCities = cities.filter((_, i) => i !== index);
      setCities(updatedCities);
      saveToLocalStorage(updatedCities);
    }
  };

  //----Filter states based on selected country------
  const filteredStates = states.filter(
    (state) => state.country.toLowerCase() === selectedCountry.toLowerCase()
  );

  //-----Filter districts based on selected state------
  const filteredDistricts = districts.filter(
    (district) =>
      district.country.toLowerCase() === selectedCountry.toLowerCase() &&
      district.state.toLowerCase() === selectedState.toLowerCase()
  );

  return (
    <div>
      <section className="get-in-touch">
        <h1 className="title">{editIndex !== null ? 'Edit City' : 'Add Your City'}</h1>
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
            <label htmlFor="stateName">District:</label>
            <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} required>
              <option className="input-text js-input">--Select Your District--</option>
              {filteredDistricts.map((district, index) => (
                <option key={index} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field col-lg-6 ">
            <input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} required className="input-text js-input" />
            <label className="label" htmlFor="City">City:</label>
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
            {cities.length > 0 ? (
              cities.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
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

export default CityAndTable;