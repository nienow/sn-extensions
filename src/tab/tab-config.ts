import {IEditorConfig} from '../editor-config';
import TabEditor from './TabEditor';
import {TabTestData} from './tab-test-data';
import {transformEditorData} from './tab-transformations';

export const TabEditorConfig: IEditorConfig = {
  editor: TabEditor,
  testData: TabTestData,
  transform: transformEditorData
};
