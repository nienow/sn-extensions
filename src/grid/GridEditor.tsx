import React, {useEffect, useState} from 'react';
import EditorKit from "@standardnotes/editor-kit";
import GridHeader from "./GridHeader";
import GridSection from "./GridSection";
import {DialogProvider} from "../providers/DialogProvider";
import styled from "styled-components";
import {EditorData} from "./grid-definitions";
import {newEditorData, transformEditorData} from "./grid-transformations";
import Unsupported from "../components/Unsupported";
import {TestData} from "./grid-test-data";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const EditorContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`

const EditorRow = styled.div`
  border-bottom: 1px solid var(--sn-stylekit-border-color);
  display: flex;
  flex: 1 0 auto;
`

const EditorSection = styled.div`
  border-right: 1px solid var(--sn-stylekit-border-color);
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`

const GridEditor = () => {
  const [data, setData] = useState<EditorData>(null);
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
      editorKit?.onEditorValueChanged(text);
    } catch (error) {
      console.log('Error saving note:', error);
    }
  };

  const saveNoteAndRefresh = () => {
    setData({...data});
    saveNote();
  };

  if (data) {
    return (
      <DialogProvider>
        <EditorContainer>
          <GridHeader data={data} saveNote={saveNoteAndRefresh}></GridHeader>
          <EditorContent>
            {
              data.sections.map((row, i) => {
                return <EditorRow key={i}>
                  {
                    row.map((section, j) => {
                      return <EditorSection key={j}>
                        {
                          <GridSection section={section} saveNote={saveNote}></GridSection>
                        }
                      </EditorSection>;
                    })
                  }
                </EditorRow>;
              })
            }
          </EditorContent>
        </EditorContainer>
      </DialogProvider>
    );
  } else if (unsupported) {
    return (
      <Unsupported eraseFn={eraseDataAndStartNewNote}></Unsupported>
    )
  }
}

export default GridEditor
