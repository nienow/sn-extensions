import React, {useEffect} from 'react';
import ListItem from "./ListItem";
import {IListData} from "./list-definitions";
import styled from "styled-components";
import useTotals from "./useTotals";
import ListTotal from "./ListTotal";
import ListTableHeader from "./ListTableHeader";

interface Params {
  data: IListData;
  saveNote: () => void;
  handleAdd: () => void;
  handleDelete: (index: number) => void;
}

const EditorContentContainer = styled.div`
  display: table;
  padding: 5px;
  border-collapse: collapse;
`

const ItemContainer = styled.div`
  display: table-row;
  padding: 5px;
`

const AddButtonCell = styled.div`
  padding: 5px;
`;

const ListEditorContent = ({data, saveNote, handleDelete, handleAdd}: Params) => {
  const {totals, updateTotals} = useTotals();

  useEffect(() => {
    updateTotals(data.items);
  }, []);

  const handleInputChange = (index: number, fieldName: string, value: any) => {
    if (index < 0) {
      const newObj = {};
      newObj[fieldName] = value;
      data.items.push(newObj);
    } else {
      data.items[index][fieldName] = value;
    }
    updateTotals(data.items);
    saveNote();
  };

  const onDelete = (index) => {
    handleDelete(index);
    updateTotals(data.items);
  };

  return (
    <>
      <EditorContentContainer>
        <ListTableHeader fields={data.fields}></ListTableHeader>
        {
          data.items.map((item, index) => {
            return <ItemContainer key={index}>
              <ListItem item={item} fields={data.fields}
                        onDelete={() => onDelete(index)}
                        onChange={(fieldName, value) => handleInputChange(index, fieldName, value)}></ListItem>

            </ItemContainer>;
          })
        }

        <ItemContainer>
          <ListTotal totals={totals} fields={data.fields}/>
        </ItemContainer>
      </EditorContentContainer>
      <AddButtonCell>
        <button onClick={handleAdd}>Add +</button>
      </AddButtonCell>
    </>
  );
}

export default ListEditorContent
