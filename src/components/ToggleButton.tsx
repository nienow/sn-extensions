import React, {useState} from 'react';
import styled from "styled-components";

interface Params {
  label: string;
  onToggle: (value: boolean) => void;
}

// const ToggleButtonOff = styled.div`
//
// `;

const ToggleButtonOn = styled.div`
  cursor: pointer;
  padding: 5px;
`;

const ToggleButton = ({label, onToggle}: Params) => {
  const [value, setValue] = useState(false);
  const toggle = () => {
    setValue(!value);
    onToggle(!value);
  };
  // if (value) {
  return <ToggleButtonOn onClick={toggle}>
    <input type="checkbox" checked={value} readOnly={true}/>
    {label}
  </ToggleButtonOn>;
  // } else {
  //   return <ToggleButtonOff onClick={toggle}>
  //     <input type="checkbox" value="true"/>
  //     {label}
  //   </ToggleButtonOff>;
  // }
}

export default ToggleButton
