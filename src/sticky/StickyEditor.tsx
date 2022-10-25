import React, {useEffect, useState} from 'react';
import EditorKit from "@standardnotes/editor-kit";
import Header from "./Header";
import styled from "styled-components";
import EditorContent from "./EditorContent";
import {IStickyData} from "./sticky-definitions";
import {newEditorData, newNoteData, transformEditorData} from "./sticky-transformations";
import Unsupported from "../components/Unsupported";
import {isDevEnv} from "../environment";
import {StickyTestData} from "./sticky-test-data";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const StickyEditor = () => {
  const [data, setData] = useState<IStickyData>(undefined);
  const [unsupported, setUnsupported] = useState(false);
  const [editorKit, setEditorKit] = useState(null);

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
      initializeText(StickyTestData);
    }
  }, []);

  const initializeText = (text) => {
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

  const addSection = () => {
    Object.values(data.sections).forEach(section => {
      section.index++;
    });
    const newId = new Date().getTime();
    data.sections[newId] = newNoteData();
    setData({...data});
    saveNote();
  };

  const handleDelete = (sectionId) => {
    const index = data.sections[sectionId].index;
    delete data.sections[sectionId];
    Object.values(data.sections).forEach(section => {
      if (section.index > index) {
        section.index--;
      }
    });
    setData({...data});
    saveNote();
  };

  if (data) {
    return (
      <EditorContainer>
        <Header data={data} addSection={addSection}></Header>
        <EditorContent saveNote={saveNote} data={data} handleDelete={handleDelete}></EditorContent>
      </EditorContainer>
    );
  } else if (unsupported) {
    return (
      <Unsupported eraseFn={eraseDataAndStartNewNote}></Unsupported>
    )
  }
}

export default StickyEditor
