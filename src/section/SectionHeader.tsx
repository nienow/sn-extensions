import React from 'react';
import styled from "styled-components";
import {ISectionData} from "./section-definitions";
import ToggleButton from "../components/ToggleButton";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
`

interface Params {
  data: ISectionData;
  saveNote: () => void;
}

const GridHeader = ({data, saveNote}: Params) => {
  const toggleTitle = () => {
    data.title = !data.title;
    saveNote();
  };

  return (
    <HeaderContainer>
      <ToggleButton label="Show Title" initialValue={data.title} onToggle={toggleTitle}/>
    </HeaderContainer>
  );
}

export default GridHeader
