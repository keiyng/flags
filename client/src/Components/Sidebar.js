import React from 'react';
import _ from 'lodash';

const Sidebar = props => {
  const continents = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const continentsList = _.map(continents, continent => {
    return (
      <li
        className={props.selected === continent ? 'selected' : 'unselected'}
        onClick={() => props.onClick(continent)}
        key={continent}
      >
        <span>{continent}</span>
      </li>
    );
  });
  
  return (
    <div>
      <ul>{continentsList}</ul>
    </div>
  );
};

export default Sidebar;
