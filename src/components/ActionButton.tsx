import styled from "styled-components";

export const ActionButton = styled.button`
  background-color: inherit;
  border: 1px solid var(--sn-stylekit-border-color);
  color: inherit;
  cursor: pointer;

  &:hover {
    background-color: var(--sn-stylekit-contrast-background-color);
  }
`

export const BigActionButton = styled(ActionButton)`
  padding: 10px 20px;
  width: 100%;
`;

export default ActionButton
