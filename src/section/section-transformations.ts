import {ISectionData} from './section-definitions';
import {DataVersion, NienowSection, NienowTab} from '../constants';
import {ITabData} from '../tab/tab-definitions';

export const newEditorData = (text): ISectionData => {
  return {
    editor: NienowSection,
    version: DataVersion,
    sections: [{text: text || ''}]
  };
};

export const transformEditorData = (text: string): ISectionData => {
  if (text) {
    if (text.indexOf('{') === 0) {
      try {
        const parsedData = JSON.parse(text);
        if (parsedData.editor === NienowSection && parsedData.version === 1) {
          return parsedData;
        } else if (parsedData.editor === NienowTab && parsedData.version === 1) {
          return transformFromTab(parsedData);
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

export const transformFromTab = (data: ITabData) => {
  return {
    editor: NienowSection,
    version: 1,
    title: true,
    sections: data.tabs
  };
};
