import React from 'react';

const Flag = ({ country }) => {
  if(country) {
    return (
      <div classname="flag">
        {/* <img src={country.flag} width="300" height="200" alt={country.name} /> */}
        <img src={country.flag} alt={country.name} width="200vw" height="120vh"/>

      </div>
    );
  } else {
    return null;
  }

};

export default Flag;
