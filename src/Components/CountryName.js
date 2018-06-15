import React from 'react';

const CountryName = ({ country }) => {
  return (
    <React.Fragment>
      <p>
        {country.name} ({country.code})
      </p>
    </React.Fragment>
  );
};

export default CountryName;
