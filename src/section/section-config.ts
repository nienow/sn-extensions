import {IEditorConfig} from '../editor-config';
import SectionEditor from './SectionEditor';
import {SectionTestData} from './section-test-data';
import {transformEditorData} from './section-transformations';

export const SectionEditorConfig: IEditorConfig = {
  editor: SectionEditor,
  testData: SectionTestData,
  transform: transformEditorData
};
