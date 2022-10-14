import {DataVersion, IListData, IListItemData, NienowList} from './list-definitions';

export const newEditorData = (): IListData => {
  return {
    editor: NienowList,
    version: DataVersion,
    fields: ['title'],
    items: [
      {}
    ]
  };
};

export const newNoteData = (): IListItemData => {
  return {};
};

export const transformEditorData = (text: string): IListData => {
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
