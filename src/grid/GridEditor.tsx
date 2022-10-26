import React from 'react';
import GridHeader from "./GridHeader";
import GridSection from "./GridSection";
import styled from "styled-components";
import {useEditor} from "../providers/EditorProvider";

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
  const {data, saveNote, saveNoteAndRefresh} = useEditor();

  return (
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
  );
}

export default GridEditor
