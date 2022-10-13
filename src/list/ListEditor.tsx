import React, {useEffect, useState} from 'react';
import EditorKit from "@standardnotes/editor-kit";
import ListHeader from "./ListHeader";
import {EditorData} from "./list-definitions";
import styled from "styled-components";
import ListEditorContent from "./ListEditorContent";
import {newEditorData, transformEditorData} from "./list-transformations";
import {ListTestData} from "./list-test-data";
import Unsupported from "../components/Unsupported";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const ListEditor = () => {
  const [data, setData] = useState<EditorData>(undefined);
  const [unsupported, setUnsupported] = useState(false);
  const [editorKit, setEditorKit] = useState<EditorKit>(null);

  useEffect(() => {
    setEditorKit(new EditorKit({
      setEditorRawText: initializeText,
      clearUndoHistory: () => {
      },
      getElementsBySelector: () => []
    }, {
      mode: 'plaintext',
      supportsFileSafe: false
    }));

    // Uncomment to use test data
    initializeText(ListTestData);
  }, []);

  const initializeText = (text: string) => {
    const data = transformEditorData(text);
    if (data) {
      setData(data);
    } else {
      setUnsupported(true);
    }
  };

  const eraseDataAndStartNewNote = () => {
    setUnsupported(false);
    setData(newEditorData());
    saveNote();
  };

  const saveNote = () => {
    const text = JSON.stringify(data);
    try {
      editorKit?.onEditorValueChanged(text);
    } catch (error) {
      console.log('Error saving note:', error);
    }
  };

  const addItem = () => {
    const date = new Date().toISOString().split('T')[0];
    data.items.push({date});
    setData({...data});
    saveNote();
  };

  const handleDelete = (index: number) => {
    data.items.splice(index, 1);
    setData({...data});
    saveNote();
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
    setData({...data});
  };

  if (data) {
    return (
      <EditorContainer>
        <ListHeader data={data} toggleField={toggleField}></ListHeader>
        <ListEditorContent saveNote={saveNote} data={data} handleAdd={addItem} handleDelete={handleDelete}></ListEditorContent>
      </EditorContainer>
    );
  } else if (unsupported) {
    return (
      <Unsupported eraseFn={eraseDataAndStartNewNote}></Unsupported>
    )
  } else {
    return null;
  }
}

export default ListEditor
