import React from 'react';

// Styles for the wrapper can be adjusted as needed
const logoStyles = {
  fontSize: '20px',
  fontWeight: 'normal',
  margin: 0,
  color: '#ffffff', // White text, assuming a dark sidebar. Adjust if needed.
  display: 'flex',
  alignItems: 'center',
  padding: '10px 0', // Add some padding
};

const imgStyles = {
  height: '30px',
  marginLeft: '10px',
  verticalAlign: 'middle',
};

export default function LogoRenderer() {
  return (
    <h1 style={logoStyles}>
      Apus Charts
      <img
        src="https://raw.githubusercontent.com/harshattray/apus/master/public/apus.svg"
        alt="Apus Charts Logo"
        style={imgStyles}
      />
    </h1>
  );
}
