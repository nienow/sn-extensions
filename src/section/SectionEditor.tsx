import React, {useEffect, useState} from 'react';
import EditorKit from "@standardnotes/editor-kit";
import {DialogProvider} from "../providers/DialogProvider";
import styled from "styled-components";
import {ISectionData} from "./section-definitions";
import {newEditorData, transformEditorData} from "./section-transformations";
import Unsupported from "../components/Unsupported";
import {TestData} from "./section-test-data";
import AutoSizeTextArea from "./AutoSizeTextArea";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

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

    // Uncomment to use test data
    initializeText(TestData);
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

  if (data) {
    return (
      <DialogProvider>
        <EditorContainer>
          {
            data.sections.map((section, index) => (
              <AutoSizeTextArea key={index} section={section} onChange={(e) => onTextChange(e, index)}
                                remove={() => removeSection(index)}></AutoSizeTextArea>
            ))
          }
          <button onClick={addSection}>Add Section +</button>
        </EditorContainer>
      </DialogProvider>
    );
  } else if (unsupported) {
    return (
      <Unsupported eraseFn={eraseDataAndStartNewNote}></Unsupported>
    )
  }
}

export default SectionEditor
