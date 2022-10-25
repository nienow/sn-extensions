import {IStickyData, IStickySectionData} from './sticky-definitions';
import {DataVersion, NienowGrid, NienowSticky} from '../constants';

export const newEditorData = (): IStickyData => {
  return {
    editor: NienowSticky,
    version: DataVersion,
    sections: {
      0: {index: 0}
    }
  };
};

export const newNoteData = (): IStickySectionData => {
  return {
    index: 0
  };
};

export const transformEditorData = (text: string): IStickyData => {
  if (text) {
    if (text.indexOf('{') === 0) {
      try {
        const parsedData = JSON.parse(text);
        if (parsedData.editor === NienowSticky && parsedData.version === 1) {
          return parsedData;
        } else if (parsedData.editor === NienowGrid && parsedData.version === 1) {
          return transformFromGrid(parsedData);
        }
      } catch {
      }
    }
    return null;
  } else {
    return newEditorData();
  }
};

export const transformFromGrid = (data: any): IStickyData => {
  const newData: IStickyData = {
    editor: NienowSticky,
    version: 1,
    sections: {}
  };

  let id = 0;
  data.sections.forEach(row => {
    row.forEach(section => {
      if (section.title || section.text) {
        const newId = id++;
        newData.sections[newId] = {
          index: newId,
          title: section.title,
          text: section.text
        };
      }
    });
  });
  return newData;
};
