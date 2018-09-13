import React from 'react';

const Flag = ({ country }) => {
  if(country) {
    return (
      <React.Fragment>
        <img src={country.flag} width="300" height="200" alt={country.name} />
      </React.Fragment>
    );
  } else {
    return null;
  }

};

export default Flag;
