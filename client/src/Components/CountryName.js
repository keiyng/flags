import React from 'react';

const CountryName = ({ country }) => {
  return (
    <div className="countryName">
      <div>
        {country.name} ({country.code})
      </div>
    </div>
  );
};

export default CountryName;
