import React, { useEffect, useState } from 'react';
import './LocationSelector.css';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch Countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          'https://crio-location-selector.onrender.com/countries'
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch States when a country is selected
  const handleCountryChange = async (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState('');
    setSelectedCity('');
    setCities([]);
    setStates([]);

    if (country) {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${country}/states`
        );
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  // Fetch Cities when a state is selected
  const handleStateChange = async (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity('');
    setCities([]);

    if (state) {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="location-container">
      <h1>Select Location</h1>

      <div className="dropdown-container">
        {/* Country Dropdown */}
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          className="dropdown country-dropdown"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* State Dropdown */}
        <select
          value={selectedState}
          onChange={handleStateChange}
          className="dropdown state-dropdown"
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City Dropdown */}
        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="dropdown city-dropdown"
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Display selected message */}
      {selectedCity && (
        <p className="selection-message">
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </p>
      )}
    </div>
  );
};

export default LocationSelector;
