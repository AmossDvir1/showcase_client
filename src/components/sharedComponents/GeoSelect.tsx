import React from "react";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import { City, Country, State } from "react-country-state-city/dist/esm/types";

import "react-country-state-city/dist/react-country-state-city.css";
import Typography from "./Typography";

interface GeoSelectProps {
  selectedCountry: Country | null;
  selectedState: State | null;
  selectedCity: City | null;
  setSelectedCountry: (country: Country | null) => void;
  setSelectedState: (state: State | null) => void;
  setSelectedCity: (city: City | null) => void;
}

const GeoSelect: React.FC<GeoSelectProps> = ({
  selectedCountry,
  selectedState,
  selectedCity,
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
}) => {
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      {/* Country Selector */}
      <Typography>Select Country</Typography>
      <CountrySelect
        autoComplete="off"
        onChange={(country) => {
          setSelectedCountry(country as Country); // Save selected country
          setSelectedState(null); // Reset state when country changes
          setSelectedCity(null); // Reset city when country changes
        }}
        placeHolder="Select Country"
      />

      {/* State Selector */}
      <Typography>Select State</Typography>
      <StateSelect
        autoComplete="off"
        countryid={selectedCountry?.id ?? 0} // Pass the selected country ID
        onChange={(state) => {
          setSelectedState(state as State); // Save selected state
          setSelectedCity(null); // Reset city when state changes
        }}
        placeHolder="Select State"
        disabled={!selectedCountry} // Disable if no country selected
      />

      {/* City Selector */}
      <Typography>Select City</Typography>
      <CitySelect
        autoComplete="off"
        countryid={selectedCountry?.id ?? 0} // Pass the selected country ID
        stateid={selectedState?.id ?? 0} // Pass the selected state ID
        onChange={(city) => setSelectedCity(city as City)} // Save selected city
        placeHolder="Select City"
        disabled={!selectedState} // Disable if no state selected
      />

      {/* Display selected values */}
      <div style={{ marginTop: "20px" }}>
        <h4>Selected Location:</h4>
        <p>Country: {selectedCountry?.name || "None"}</p>
        <p>State: {selectedState?.name || "None"}</p>
        <p>City: {selectedCity?.name || "None"}</p>
      </div>
    </div>
  );
};

export default GeoSelect;
