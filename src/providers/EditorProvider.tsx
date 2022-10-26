import React, {createContext, useContext, useEffect, useState} from 'react';
import EditorKit from "@standardnotes/editor-kit";
import Unsupported from "../components/Unsupported";
import {isDevEnv} from "../environment";
import {IEditorConfig} from "../editor-config";

interface Props {
  config: IEditorConfig;
}

interface IEditorContext {
  data: any;
  hasChanges: boolean;
  saveNote: () => void;
  saveNoteAndRefresh: () => void;
  revertChanges: () => void;
}

const EditorContext = createContext<IEditorContext>({
  data: null,
  hasChanges: false,
  saveNote: null,
  saveNoteAndRefresh: null,
  revertChanges: null
});

export const useEditor = () => useContext(EditorContext);

let backupData;
export const EditorProvider = ({config}: Props) => {
  const [editor, setEditor] = useState(null);
  const [data, setData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [unsupported, setUnsupported] = useState(false);

  const eraseDataAndStartNewNote = () => {
    setUnsupported(false);
    setData(config.transform());
    saveNote();
  };

  const initializeText = (text) => {
    const data = config.transform(text);
    if (data) {
      backupData = JSON.parse(JSON.stringify(data));
      setData(data);
    } else {
      setUnsupported(true);
    }
  };

  useEffect(() => {
    setEditor(new EditorKit({
      setEditorRawText: initializeText,
      clearUndoHistory: () => {
      },
      getElementsBySelector: () => []
    }, {
      mode: 'plaintext',
      supportsFileSafe: false
    }));

    if (isDevEnv()) {
      initializeText(config.testData);
    }
  }, []);


  const saveNote = () => {
    setHasChanges(true);
    const text = JSON.stringify(data);
    try {
      editor.onEditorValueChanged(text);
    } catch (error) {
      console.log('Error saving note:', error);
    }
  };

  const saveNoteAndRefresh = () => {
    setData({...data});
    saveNote();
  };

  const revertChanges = () => {
    saveNote();
    setData(JSON.parse(JSON.stringify(backupData)));
    setHasChanges(false);
  };

  const renderContent = () => {
    if (data) {
      return <config.editor/>;
    } else if (unsupported) {
      return <Unsupported eraseFn={eraseDataAndStartNewNote}></Unsupported>;
    } else {
      return <div>Loading...</div>
    }
  };

  return (
    <EditorContext.Provider value={{data, hasChanges, saveNote, saveNoteAndRefresh, revertChanges}}>
      {renderContent()}
    </EditorContext.Provider>
  );
};
