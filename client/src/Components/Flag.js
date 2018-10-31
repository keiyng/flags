import React from 'react';

const Flag = ({ country, width, height }) => {
  if(country) {
    return (
      <div className="flag">
        <img src={country.flag} alt={country.name} width={width} height={height}/>

      </div>
    );
  } else {
    return null;
  }

};

export default Flag;
