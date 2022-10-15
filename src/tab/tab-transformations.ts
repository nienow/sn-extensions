import {DataVersion, ITabData, NienowGrid} from './tab-definitions';

export const newEditorData = (text): ITabData => {
  return {
    editor: NienowGrid,
    version: DataVersion,
    tabs: [{title: 'One', text: text || ''}]
  };
};

export const transformEditorData = (text: string): ITabData => {
  if (text) {
    if (text.indexOf('{') === 0) {
      try {
        const parsedData = JSON.parse(text);
        if (parsedData.editor === NienowGrid && parsedData.version === 1) {
          return parsedData;
        }
      } catch (e) {
        console.error(e);
      }
      return null;
    }
  } else {
    return newEditorData(text);
  }
};
