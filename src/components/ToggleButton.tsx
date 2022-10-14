import React, {useState} from 'react';
import styled from "styled-components";

interface Params {
  label: string;
  initialValue: boolean;
  onToggle: (value: boolean) => void;
}

const ToggleButtonOn = styled.div`
  cursor: pointer;
  padding: 5px;
`;

const ToggleButton = ({label, initialValue, onToggle}: Params) => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => {
    setValue(!value);
    onToggle(!value);
  };
  return <ToggleButtonOn onClick={toggle}>
    <input type="checkbox" checked={value} readOnly={true}/>
    {label}
  </ToggleButtonOn>;
}

export default ToggleButton
