import React from 'react';
import _ from 'lodash';

const Sidebar = props => {
  const continents = [
    'All',
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Others'
  ];

  const continentsList = _.map(continents, continent => {
    return (
      <li onClick={() => props.onClick(continent)} key={continent}>
        {continent}
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
