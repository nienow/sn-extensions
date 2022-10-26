import {IEditorConfig} from '../editor-config';
import ListEditor from './ListEditor';
import {ListTestData} from './list-test-data';
import {transformEditorData} from './list-transformations';

export const ListEditorConfig: IEditorConfig = {
  editor: ListEditor,
  testData: ListTestData,
  transform: transformEditorData
};
