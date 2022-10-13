import React from 'react';
import styled from "styled-components";
import {EditorData} from "./list-definitions";
import ToggleButton from "../components/ToggleButton";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
`

// const HeaderButton = styled.button`
//   color: var(--sn-stylekit-secondary-foreground-color);
//   background-color: var(--sn-stylekit-secondary-background-color);
//   border: none;
//   outline: none;
//   padding: 5px 10px;
//   cursor: pointer;
//   border-right: 1px solid var(--sn-stylekit-border-color);
// `

interface Params {
  data: EditorData;
  toggleField: (name: string, value: boolean) => void;
}

const ListHeader = ({toggleField}: Params) => {
  // const {confirm} = useDialog();
  // const toggle = (name: string, value: boolean) => {
  //   // if (!value) {
  //   //   const hasData = !!data.items.find(item => !!item[name]);
  //   //   if (hasData) {
  //   //     confirm('Are you sure you want to remove the ' + name + ' field? All field values will be lost.', () => {
  //   //
  //   //     });
  //   //   }
  //   // }
  //   data.fields[name] = value;
  //   refresh();
  // };

  // const removeField = (name: string) => {
  //
  // };

  return (
    <HeaderContainer>
      <ToggleButton label="Price" onToggle={(value) => toggleField('price', value)}></ToggleButton>
      <ToggleButton label="Number" onToggle={(value) => toggleField('number', value)}></ToggleButton>
      <ToggleButton label="Date" onToggle={(value) => toggleField('date', value)}></ToggleButton>
    </HeaderContainer>
  );
}

export default ListHeader
