import React from 'react';
import styled from "styled-components";
import AutoSizeTextArea from "./AutoSizeTextArea";
import SectionHeader from "./SectionHeader";
import {BigActionButton} from "../components/ActionButton";
import {useEditor} from "../providers/EditorProvider";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const SectionContainer = styled.div`

`;

const SectionTitle = styled.input`
  border: none;
  background-color: var(--sn-stylekit-secondary-background-color);
  outline: none;
  color: var(--sn-stylekit-foreground-color);
  line-height: 1.4;
  padding: 5px 10px;
  width: 100%;
  box-sizing: border-box;
`;

const SectionEditor = () => {
  const {data, saveNote, saveNoteAndRefresh} = useEditor();

  const onTextChange = (e, index) => {
    data.sections[index].text = e.target.value;
    saveNote();
  };

  const addSection = () => {
    const newTab = {text: ''};
    data.sections.push(newTab);
    saveNoteAndRefresh();
  };

  const removeSection = (index) => {
    data.sections.splice(index, 1);
    saveNoteAndRefresh();
  };

  const onTitleChange = (e, index) => {
    data.sections[index].title = e.target.value;
    saveNote();
  };

  return (
    <EditorContainer>
      <SectionHeader data={data} saveNote={saveNoteAndRefresh}/>
      {
        data.sections.map((section, index) => (
          <SectionContainer key={index}>
            {
              data.title ?
                <SectionTitle type="text" name="title" value={section.title} onChange={(e) => onTitleChange(e, index)}/>
                : <div></div>
            }
            <AutoSizeTextArea section={section} onChange={(e) => onTextChange(e, index)}
                              remove={() => removeSection(index)}></AutoSizeTextArea>
          </SectionContainer>
        ))
      }
      <BigActionButton onClick={addSection}>Add Section +</BigActionButton>
    </EditorContainer>
  );
}

export default SectionEditor
