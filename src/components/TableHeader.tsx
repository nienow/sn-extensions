import React from 'react';
import styled from "styled-components";

interface Params {
  fields: string[];
}

const TH = styled.div`
  display: table-cell;
  font-weight: bold;
  border: 1px solid #ddd;
  text-align: left;
  text-transform: uppercase;
  padding: 5px;
`;

const colWidths = {
  title: 200,
  price: 100,
  number: 100,
  date: 150
}

const TableHeader = ({fields}: Params) => {
  return (
    <>
      {
        fields.map(field =>
          <TH key={field} style={{width: colWidths[field]}}>{field}</TH>
        )
      }
    </>
  );
};

export default TableHeader
