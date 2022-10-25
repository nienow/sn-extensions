import React, {useEffect, useState} from 'react';
import EditorKit from "@standardnotes/editor-kit";
import ListHeader from "./ListHeader";
import {IListData} from "./list-definitions";
import styled from "styled-components";
import ListEditorContent from "./ListEditorContent";
import {newEditorData, transformEditorData} from "./list-transformations";
import {ListTestData} from "./list-test-data";
import Unsupported from "../components/Unsupported";
import {isDevEnv} from "../environment";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

let backupData;

const ListEditor = () => {
  const [data, setData] = useState<IListData>(undefined);
  const [hasChanges, setHasChanges] = useState(false);
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

    if (isDevEnv()) {
      initializeText(ListTestData);
    }
  }, []);

  const initializeText = (text: string) => {
    const data = transformEditorData(text);
    if (data) {
      backupData = JSON.parse(JSON.stringify(data));
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
    setHasChanges(true);
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

  const revertChanges = () => {
    saveNote();
    setData(JSON.parse(JSON.stringify(backupData)));
    setHasChanges(false);
  };

  if (data) {
    return (
      <EditorContainer>
        <ListHeader data={data} hasChanges={hasChanges} toggleField={toggleField} revertChanges={revertChanges}></ListHeader>
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
