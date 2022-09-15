import React from 'react';
import Button from './Button';
import './ButtonBox.css';

const ButtonBox = ({ children }) => {
  return (
    <div className='buttonBox'>
      {children}
      <Button />
    </div>
  );
};

export default ButtonBox;
