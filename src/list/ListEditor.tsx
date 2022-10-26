import React from 'react';
import ListHeader from "./ListHeader";
import styled from "styled-components";
import ListEditorContent from "./ListEditorContent";
import {useEditor} from "../providers/EditorProvider";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const ListEditor = () => {
  const {data, hasChanges, saveNote, saveNoteAndRefresh, revertChanges} = useEditor();

  const addItem = () => {
    const date = new Date().toISOString().split('T')[0];
    data.items.push({date});
    saveNoteAndRefresh();
  };

  const handleDelete = (index: number) => {
    data.items.splice(index, 1);
    saveNoteAndRefresh();
  };

  const toggleField = (name: string, value: boolean) => {
    const currentIndex = data.fields.indexOf(name);
    if (value) {
      if (currentIndex < 0) {
        data.fields.push(name);
      }
    } else if (currentIndex >= 0) {
      data.fields.splice(currentIndex, 1);
    }
    saveNoteAndRefresh();
  };

  return (
    <EditorContainer>
      <ListHeader data={data} hasChanges={hasChanges} toggleField={toggleField} revertChanges={revertChanges}></ListHeader>
      <ListEditorContent saveNote={saveNote} data={data} handleAdd={addItem} handleDelete={handleDelete}></ListEditorContent>
    </EditorContainer>
  );
}

export default ListEditor
