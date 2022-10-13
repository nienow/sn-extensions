import React, {useState} from 'react';
import styled from "styled-components";
import {ItemData} from "./list-definitions";

const FieldContainer = styled.div`
  display: table-cell;
  border: 1px solid #aaa;
  padding: 0 5px;
`;

const FieldInput = styled.input`
  padding: 5px;
  border: none;
  width: 100%;
  box-sizing: border-box;
  //border-bottom: 1px solid #333;

  &:focus {
    outline: none;
  }
`;

interface Params {
  fieldName: string;
  item: ItemData;
  onChange: (e: any) => void;
}

const getType = (field) => {
  if (['price', 'number'].includes(field)) {
    return 'number';
  } else if ('date' === field) {
    return 'date';
  }
  return 'text';
};

const ListField = (params: Params) => {
  const [value, setValue] = useState(params.item[params.fieldName] || '');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    params.onChange(event.target.value);
  };

  return (
    <FieldContainer>
      <FieldInput name={params.fieldName} type={getType(params.fieldName)} value={value} onChange={onChange}/>
    </FieldContainer>
  );
};

export default ListField
