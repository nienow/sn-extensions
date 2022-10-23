import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Section} from "./section-definitions";

interface Params {
  section: Section;
  onChange: (e) => void;
  remove: () => void;
}

const SectionTextArea = styled.textarea`
  background-color: inherit;
  border: none;
  outline: none;
  padding: 10px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  line-height: 1.4;
  resize: none;
  color: var(--sn-stylekit-foreground-color);
  border-bottom: 1px solid var(--sn-stylekit-border-color);
  overflow-y: hidden;
`;

const AutoSizeTextArea = ({section, onChange, remove}: Params) => {
  const [text, setText] = useState(section.text);
  const ref = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = '0';
      ref.current.style.height = (ref.current.scrollHeight) + 'px';
    }
  });

  const onLocalChange = (e) => {
    setText(e.target.value);
    onChange(e);
  };

  const onKeyUp = (e) => {
    if (e.key === 'Delete' && text?.trim().length === 0) {
      remove();
    }
  };

  return (
    <SectionTextArea ref={ref} value={text} onChange={onLocalChange} onKeyUp={onKeyUp}></SectionTextArea>
  );
}

export default AutoSizeTextArea
