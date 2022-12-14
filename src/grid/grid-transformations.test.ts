import {describe, expect, test} from '@jest/globals';
import {newEditorData, transformEditorData} from './grid-transformations';

describe('transformations', () => {
  test('transform from sticky editor - 4', () => {
    const result = transformEditorData(JSON.stringify({
      editor: 'nienow.sticky',
      version: 1,
      sections: {
        0: {index: 0, title: 'title1', text: 'text1'},
        1: {index: 1, title: 'title2', text: 'text2'},
        2: {index: 2, title: 'title3', text: 'text3'},
        3: {index: 3, title: 'title4', text: 'text4'}
      }
    }));

    expect(result).toEqual({
      editor: 'nienow.grid',
      version: 1,
      rows: 2,
      columns: 2,
      sections: [
        [{title: 'title1', text: 'text1'}, {title: 'title2', text: 'text2'}],
        [{title: 'title3', text: 'text3'}, {title: 'title4', text: 'text4'}]
      ]
    });
  });

  test('transform from sticky editor - 4 - unordered', () => {
    const result = transformEditorData(JSON.stringify({
      editor: 'nienow.sticky',
      version: 1,
      sections: {
        0: {index: 2, title: 'title3', text: 'text3'},
        1: {index: 0, title: 'title1', text: 'text1'},
        2: {index: 1, title: 'title2', text: 'text2'},
        3: {index: 3, title: 'title4', text: 'text4'}
      }
    }));

    expect(result).toEqual({
      editor: 'nienow.grid',
      version: 1,
      rows: 2,
      columns: 2,
      sections: [
        [{title: 'title1', text: 'text1'}, {title: 'title2', text: 'text2'}],
        [{title: 'title3', text: 'text3'}, {title: 'title4', text: 'text4'}]
      ]
    });
  });

  test('transform from sticky editor - 1', () => {
    const result = transformEditorData(JSON.stringify({
      editor: 'nienow.sticky',
      version: 1,
      sections: {
        0: {index: 0, title: 'title1', text: 'text1'}
      }
    }));

    expect(result).toEqual({
      editor: 'nienow.grid',
      version: 1,
      rows: 1,
      columns: 1,
      sections: [
        [{title: 'title1', text: 'text1'}]
      ]
    });
  });

  test('transform from sticky editor - 0', () => {
    const result = transformEditorData(JSON.stringify({
      editor: 'nienow.sticky',
      version: 1,
      sections: {}
    }));

    expect(result).toEqual(newEditorData(''));
  });

  test('transform from sticky editor - 3', () => {
    const result = transformEditorData(JSON.stringify({
      editor: 'nienow.sticky',
      version: 1,
      sections: {
        0: {index: 0, title: 'title1', text: 'text1'},
        1: {index: 1, title: 'title2', text: 'text2'},
        2: {index: 2, title: 'title3', text: 'text3'}
      }
    }));

    expect(result).toEqual({
      editor: 'nienow.grid',
      version: 1,
      rows: 2,
      columns: 2,
      sections: [
        [{title: 'title1', text: 'text1'}, {title: 'title2', text: 'text2'}],
        [{title: 'title3', text: 'text3'}, {}]
      ]
    });
  });
});
