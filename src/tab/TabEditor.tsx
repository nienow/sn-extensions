import React, {useEffect, useState} from 'react';
import EditorKit from "@standardnotes/editor-kit";
import {DialogProvider, useDialog} from "../providers/DialogProvider";
import styled from "styled-components";
import {ITabData} from "./tab-definitions";
import {newEditorData, transformEditorData} from "./tab-transformations";
import Unsupported from "../components/Unsupported";
import DeleteIcon from "../components/icons/DeleteIcon";
import {usePopover} from "../providers/PopoverProvider";

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

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
`;

const TabTitleContainer = styled.div`
  border-right: 1px solid var(--sn-stylekit-border-color);
  padding: 5px;
  cursor: pointer;
  display: flex;

  &.active {
    background-color: var(--sn-stylekit-contrast-background-color);
  }
`;

const TabTitle = styled.div`
  flex: 1 1 auto;
`;

const TabTitleEditable = styled.input`
  flex: 1 1 auto;
  border: none;
  //background-color: var(--sn-stylekit-contrast-background-color);
  outline: none;
  color: var(--sn-stylekit-foreground-color);
`;

// const DeleteButton = styled.div`
//   margin-left: 5px;
// `;

const SectionTextArea = styled.textarea`
  flex: 1 1 auto;
  background-color: inherit;
  border: none;
  outline: none;
  padding: 10px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  line-height: 1.4;
  resize: none;
  color: var(--sn-stylekit-foreground-color);
`;

const TabEditor = () => {
  let workingTitle = '';
  const [data, setData] = useState<ITabData>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [unsupported, setUnsupported] = useState(false);
  const [editorKit, setEditorKit] = useState(null);
  const {popover} = usePopover();
  const {confirm} = useDialog();

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
    // initializeText(TestData);
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

  const changeTab = (index) => {
    setActiveTab(index);
  };

  const onTextChange = (e) => {
    data.tabs[activeTab].text = e.target.value;
    setData({...data});
    saveNote();
  };

  const addTab = () => {
    const newTab = {title: 'New'};
    data.tabs.push(newTab);
    setData({...data});
    setActiveTab(data.tabs.length - 1);
    saveNote();
  };

  const deleteTabConfirm = (index) => {
    if (data.tabs[index].text) {
      confirm('Are you sure you want to remove this tab?', () => {
        deleteTab(index)
      });
    } else {
      deleteTab(index);
    }
  };

  const deleteTab = (index) => {
    data.tabs.splice(index, 1);
    const newData = {...data};
    setData(newData);
    setActiveTab(0);
    saveNote();
  };

  const onTitleChange = () => {
    console.log(workingTitle);
    data.tabs[activeTab].title = workingTitle;
    setData({...data});
    saveNote();
  };

  const openPopover = (e, tab, index) => {
    workingTitle = tab.title;
    let closePopover;
    const onDeleteIconClick = () => {
      closePopover();
      deleteTabConfirm(index)
    };
    const popoverContents = <div>
      <TabTitleEditable id="working-title" defaultValue={tab.title} onChange={(e) => workingTitle = e.target.value}></TabTitleEditable>
      <button onClick={onDeleteIconClick}><DeleteIcon/></button>
    </div>;
    closePopover = popover(e.target.parentNode, popoverContents, onTitleChange);
    setTimeout(() => {
      const el = document.getElementById('working-title') as HTMLInputElement;
      el.select();
    });
  };

  const renderTabTitle = (index, tab) => {
    if (index === activeTab) {
      return <TabTitle onClick={(e) => openPopover(e, tab, index)}>{tab.title}</TabTitle>;
    }
    return <TabTitle onClick={() => changeTab(index)}>{tab.title}</TabTitle>
  };

  if (data) {
    return (
      <DialogProvider>
        <EditorContainer>
          <Tabs>
            {
              data.tabs.map((tab, index) => (
                <TabTitleContainer key={index} className={index === activeTab ? 'active' : ''}>
                  {renderTabTitle(index, tab)}
                  {/*{*/}
                  {/*  (index === activeTab) ? <DeleteButton onClick={() => deleteTabConfirm(index)}><DeleteIcon></DeleteIcon></DeleteButton> :*/}
                  {/*    <div></div>*/}
                  {/*}*/}
                </TabTitleContainer>
              ))
            }
            <button onClick={addTab}>+</button>
          </Tabs>
          <EditorContent>
            <SectionTextArea tabIndex={1} name="value" value={data.tabs[activeTab]?.text || ''} onChange={onTextChange}/>
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

export default TabEditor
