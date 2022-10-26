import GridEditor from './GridEditor';
import {IEditorConfig} from '../editor-config';
import {GridTestData} from './grid-test-data';
import {transformEditorData} from './grid-transformations';

export const GridEditorConfig: IEditorConfig = {
  editor: GridEditor,
  testData: GridTestData,
  transform: transformEditorData
};
