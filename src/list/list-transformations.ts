import {DataVersion, EditorData, ItemData, NienowList} from './list-definitions';

export const newEditorData = (): EditorData => {
  return {
    editor: NienowList,
    version: DataVersion,
    fields: ['title'],
    items: [
      {}
    ]
  };
};

export const newNoteData = (): ItemData => {
  return {};
};

export const transformEditorData = (text: string): EditorData => {
  if (text) {
    if (text.indexOf('{') === 0) {
      try {
        const parsedData = JSON.parse(text);
        if (parsedData.editor === NienowList && parsedData.version === 1) {
          return parsedData;
        }
      } catch {
      }
    }
    return null;
  } else {
    return newEditorData();
  }
};
