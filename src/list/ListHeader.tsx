import React from 'react';
import styled from "styled-components";
import {IListData} from "./list-definitions";
import ToggleButton from "../components/ToggleButton";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
`

const RevertButtonContainer = styled.div`
  text-align: right;
  flex-grow: 1;
`;

const RevertButton = styled.button`

`;

interface Params {
  data: IListData;
  hasChanges: boolean;
  toggleField: (name: string, value: boolean) => void;
  revertChanges: () => void;
}

const ListHeader = ({data, hasChanges, toggleField, revertChanges}: Params) => {
  return (
    <HeaderContainer>
      <ToggleButton label="Price" initialValue={data.fields.includes('price')}
                    onToggle={(value) => toggleField('price', value)}></ToggleButton>
      <ToggleButton label="Number" initialValue={data.fields.includes('number')}
                    onToggle={(value) => toggleField('number', value)}></ToggleButton>
      <ToggleButton label="Date" initialValue={data.fields.includes('date')}
                    onToggle={(value) => toggleField('date', value)}></ToggleButton>
      {
        hasChanges ? <RevertButtonContainer><RevertButton onClick={revertChanges}>Revert Changes</RevertButton></RevertButtonContainer> :
          <div></div>
      }
    </HeaderContainer>
  );
}

export default ListHeader
