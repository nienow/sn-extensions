import React, {useEffect, useState} from 'react';
import EditorKit from "@standardnotes/editor-kit";
import styled from "styled-components";
import {ISectionData} from "./section-definitions";
import {newEditorData, transformEditorData} from "./section-transformations";
import Unsupported from "../components/Unsupported";
import {SectionTestData} from "./section-test-data";
import AutoSizeTextArea from "./AutoSizeTextArea";
import SectionHeader from "./SectionHeader";
import {BigActionButton} from "../components/ActionButton";
import {isDevEnv} from "../environment";

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
  const [data, setData] = useState<ISectionData>(null);
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
      initializeText(SectionTestData);
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
    setData(newEditorData(''));
    saveNote();
  };

  const saveNote = () => {
    const text = JSON.stringify(data);
    try {
      editorKit.onEditorValueChanged(text);
    } catch (error) {
      console.log('Error saving note:', error);
    }
  };

  const saveNoteAndRerender = () => {
    setData({...data});
    saveNote();
  };

  const onTextChange = (e, index) => {
    data.sections[index].text = e.target.value;
    saveNote();
  };

  const addSection = () => {
    const newTab = {text: ''};
    data.sections.push(newTab);
    setData({...data});
    saveNote();
  };

  const removeSection = (index) => {
    data.sections.splice(index, 1);
    const newData = {...data};
    setData(newData);
    saveNote();
  };

  const onTitleChange = (e, index) => {
    data.sections[index].title = e.target.value;
    saveNote();
  };

  if (data) {
    return (
      <EditorContainer>
        <SectionHeader data={data} saveNote={saveNoteAndRerender}/>
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
  } else if (unsupported) {
    return (
      <Unsupported eraseFn={eraseDataAndStartNewNote}></Unsupported>
    )
  }
}

export default SectionEditor
