import React from 'react';
import Header from "./Header";
import styled from "styled-components";
import EditorContent from "./EditorContent";
import {IStickySectionData} from "./sticky-definitions";
import {newNoteData} from "./sticky-transformations";
import {useEditor} from "../providers/EditorProvider";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const StickyEditor = () => {
  const {data, saveNote, saveNoteAndRefresh} = useEditor();

  const addSection = () => {
    Object.values(data.sections).forEach((section: IStickySectionData) => {
      section.index++;
    });
    const newId = new Date().getTime();
    data.sections[newId] = newNoteData();
    saveNoteAndRefresh();
  };

  const handleDelete = (sectionId) => {
    const index = data.sections[sectionId].index;
    delete data.sections[sectionId];
    Object.values(data.sections).forEach((section: IStickySectionData) => {
      if (section.index > index) {
        section.index--;
      }
    });
    saveNoteAndRefresh();
  };

  return (
    <EditorContainer>
      <Header data={data} addSection={addSection}></Header>
      <EditorContent saveNote={saveNote} data={data} handleDelete={handleDelete}></EditorContent>
    </EditorContainer>
  );
}

export default StickyEditor
