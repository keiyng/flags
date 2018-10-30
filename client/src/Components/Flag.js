import React from 'react';

const Flag = ({ country }) => {
  if(country) {
    return (
      <div className="flag">
        <img src={country.flag} alt={country.name} width="200vw" height="140vh"/>

      </div>
    );
  } else {
    return null;
  }

};

export default Flag;
