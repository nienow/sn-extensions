import {ISectionData} from './section-definitions';
import {DataVersion, NienowSection} from '../constants';

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
