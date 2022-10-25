import React from 'react';
import {IListItemData} from "./list-definitions";
import ListField from "./ListField";
import styled from "styled-components";
import DeleteIcon from "../components/icons/DeleteIcon";
import ActionButton from "../components/ActionButton";

interface Params {
  item: IListItemData;
  fields: string[];
  onChange: (fieldName: string, value: any) => void;
  onDelete: () => void;
}

// const DeleteButtonContainer = styled.div`
//   display: table-cell;
//   border: 1px solid var(--sn-stylekit-border-color);
//   padding: 0 5px;
// `;


const DeleteButton = styled(ActionButton)`
  padding: 5px;
`;

const ListItem = (params: Params) => {
  return (
    <>
      {
        params.fields.map(field =>
          <ListField key={field} fieldName={field} item={params.item} onChange={(value) => params.onChange(field, value)}/>
        )
      }
      {/*<DeleteButtonContainer>*/}
      <DeleteButton onClick={params.onDelete}><DeleteIcon></DeleteIcon></DeleteButton>
      {/*</DeleteButtonContainer>*/}
    </>
  );
};

export default ListItem
