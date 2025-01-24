import React, { useState, useEffect } from 'react';
import { serverReq } from '../../API/utils/axiosConfig';
import { Select, MenuItem, CircularProgress, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface CustomSelectProps {
  label: string;
  options: { id: number; name: string }[];
  value: number | null;
  onChange: (event: SelectChangeEvent<number>) => void;
  disabled?: boolean;
  loading?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  loading = false,
}) => {
  return (
    <FormControl fullWidth className="my-4">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value || ''}
        onChange={onChange}
        disabled={disabled || loading}
        className="bg-white"
      >
        <MenuItem value="">
          {loading ? <CircularProgress size={20} /> : `Select a ${label.toLowerCase()}`}
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};


interface Country {
  id: number;
  name: string;
}

interface State {
  id: number;
  name: string;
}
interface City {
  id: number;
  name: string
}

interface LocationSelectorProps {
}


const GeoSelect: React.FC = () => {
  const [countries, setCountries] = useState<{ id: number; name: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [states, setStates] = useState<{ id: number; name: string }[]>([]);
  const [selectedState, setSelectedState] = useState<number | null>(null);
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState({ countries: false, states: false, cities: false });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading((prev) => ({ ...prev, countries: true }));
      try {
        const response = await serverReq.get(`settings/geo/countries`);
        setCountries(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading((prev) => ({ ...prev, countries: false }));
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      setCities([]);
      return;
    }
    const fetchStates = async () => {
      setLoading((prev) => ({ ...prev, states: true }));
      try {
        const response = await serverReq.get(`settings/geo/states/${selectedCountry}`);
        setStates(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading((prev) => ({ ...prev, states: false }));
      }
    };
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      return;
    }
    const fetchCities = async () => {
      setLoading((prev) => ({ ...prev, cities: true }));
      try {
        const response = await serverReq.get(`settings/geo/cities/${selectedCountry}/${selectedState}`);
        setCities(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading((prev) => ({ ...prev, cities: false }));
      }
    };
    fetchCities();
  }, [selectedState, selectedCountry]);

  const handleCountryChange = (event: SelectChangeEvent<number>) => {
    const countryId = parseInt(event.target.value as string, 10);
    setSelectedCountry(countryId);
    setSelectedState(null); // Reset state and city
    setCities([]);
  };

  const handleStateChange = (event: SelectChangeEvent<number>) => {
    const stateId = parseInt(event.target.value as string, 10);
    setSelectedState(stateId);
  };

  return (
    <div className="p-4">
      {error && <div className="text-red-500">{`Error: ${error}`}</div>}
      <CustomSelect
        label="Country"
        options={countries}
        value={selectedCountry}
        onChange={handleCountryChange}
        loading={loading.countries}
      />
      <CustomSelect
        label="State"
        options={states}
        value={selectedState}
        onChange={handleStateChange}
        loading={loading.states}
        disabled={!selectedCountry || states.length === 0}
      />
      <CustomSelect
        label="City"
        options={cities}
        value={null} // Update with selected city if needed
        onChange={() => {}} // Update this handler if city selection is needed
        loading={loading.cities}
        disabled={!selectedState || cities.length === 0}
      />
    </div>
  );
};

export default GeoSelect;