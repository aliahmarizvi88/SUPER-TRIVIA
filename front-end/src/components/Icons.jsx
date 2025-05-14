import React from 'react';
import Geography from '../assets/icons/Geography.svg';
import Science from '../assets/icons/Science&Nature.svg';
import History from '../assets/icons/History.svg';
import Movies from '../assets/icons/Movies.svg';
import Sports from '../assets/icons/sports.svg';
import Games from '../assets/icons/Games.svg';
const iconMap = {
  Geography: Geography,
  'Science and Nature': Science,
  History: History,
  Movies: Movies,
  Sports: Sports,
  Games: Games,
};

const Icons = ({ category, size }) => {
  const icon = iconMap[category];

  return (
    <div>
      <img src={icon} alt={category} width={size} height={size} />
    </div>
  );
};

export default Icons;
