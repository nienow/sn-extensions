import {IEditorConfig} from '../editor-config';
import StickyEditor from './StickyEditor';
import {StickyTestData} from './sticky-test-data';
import {transformEditorData} from './sticky-transformations';

export const StickyEditorConfig: IEditorConfig = {
  editor: StickyEditor,
  testData: StickyTestData,
  transform: transformEditorData
};
