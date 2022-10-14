import React from 'react';
import styled from "styled-components";

interface Params {
  fields: string[];
}

const TH = styled.div`
  display: table-cell;
  font-weight: 500;
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

const ListTableHeader = ({fields}: Params) => {
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

export default ListTableHeader
