import React from 'react';
import styled from "styled-components";

const TotalCell = styled.div`
  display: table-cell;
  border: 1px solid #aaa;
  padding: 5px;
`;

const ListTotal = ({fields, totals}) => {

  return (
    <>
      {
        fields.map(field => {
          if (field === 'title') {
            return <TotalCell key={field}>Total</TotalCell>
          } else if (field === 'price') {
            return <TotalCell key={field}>{totals.price.toFixed(2)}</TotalCell>
          } else if (field === 'number') {
            return <TotalCell key={field}>{totals.number}</TotalCell>
          }
        })
      }
    </>
  );
};

export default ListTotal