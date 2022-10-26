import React, {useState} from 'react';
import {useDialog} from "../providers/DialogProvider";
import styled from "styled-components";
import DeleteIcon from "../components/icons/DeleteIcon";
import {usePopover} from "../providers/PopoverProvider";
import ActionButton from "../components/ActionButton";
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

const AddTabButton = styled.button`
  border: none;
  background-color: inherit;
  color: inherit;
  cursor: pointer;
  border-right: 1px solid var(--sn-stylekit-border-color);

  &:hover {
    background-color: var(--sn-stylekit-contrast-background-color);;
  }
`;

const TabEditor = () => {
  let workingTitle = '';
  const {data, saveNoteAndRefresh} = useEditor();
  const [activeTab, setActiveTab] = useState<number>(0);
  const {popover} = usePopover();
  const {confirm} = useDialog();

  const changeTab = (index) => {
    setActiveTab(index);
  };

  const onTextChange = (e) => {
    data.tabs[activeTab].text = e.target.value;
    saveNoteAndRefresh();
  };

  const addTab = () => {
    const newTab = {title: 'New'};
    data.tabs.push(newTab);
    setActiveTab(data.tabs.length - 1);
    saveNoteAndRefresh();
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
    setActiveTab(0);
    saveNoteAndRefresh();
  };

  const onTitleChange = () => {
    console.log(workingTitle);
    data.tabs[activeTab].title = workingTitle;
    saveNoteAndRefresh();
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
      <ActionButton onClick={onDeleteIconClick}><DeleteIcon/></ActionButton>
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

  return (
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
        <AddTabButton onClick={addTab}>+</AddTabButton>
      </Tabs>
      <EditorContent>
        <SectionTextArea tabIndex={1} name="value" value={data.tabs[activeTab]?.text || ''} onChange={onTextChange}/>
      </EditorContent>
    </EditorContainer>
  );
}

export default TabEditor
